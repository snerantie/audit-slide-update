"""Meeting Intelligence Agent.

Reads governance meeting minutes and returns a structured MeetingRecord
containing decisions, risks, actions, discussions and an executive summary.

Every extracted item carries a source_quote — verbatim text from the minute —
which makes downstream Jira tickets and executive narratives fully auditable.

Design principles:
  - Prompt-engineered structured output (JSON) with a repair loop
  - Pydantic validation catches malformed responses
  - Retries with a corrective prompt on parse failure (max 1 retry)
  - Full metadata returned for cost + audit + eval
"""

from __future__ import annotations

import json
import logging
import re
from typing import Tuple

from pydantic import ValidationError

from ..bedrock_client import (
    DEFAULT_MODEL_ID,
    LLAMA_33_70B_PRICE_IN_PER_1M,
    LLAMA_33_70B_PRICE_OUT_PER_1M,
)
from ..schemas import MeetingRecord, RunMetadata

logger = logging.getLogger(__name__)


SYSTEM_PROMPT = """You are the Meeting Intelligence Agent of a Technology Management Tower.

Your job: read a governance meeting minute OR raw transcript and extract a structured record — decisions, risks, actions, discussion topics, and an executive summary.

You must handle two kinds of input:
- STRUCTURED minutes with explicit "Agenda:" / "Item 1 / Item 2" sections
- UNSTRUCTURED transcripts or notes where topics emerge from the flow of discussion with no formal agenda

Rules:

1. AGENDA HANDLING (critical for unstructured input):
   - If the source explicitly lists agenda items, extract them verbatim and set agenda_inferred=false.
   - If NO explicit agenda is stated, identify the natural topic segments as the discussion flows (e.g. "PaymentGate incidents", "Recovery plan", "Data Platform gates"). Populate `agenda` with these inferred topics AND set agenda_inferred=true.
   - Even with an inferred agenda, EVERY action, decision and risk should reference its `agenda_item` (which topic it belongs to).

2. Extract EVERY action, decision and risk explicitly stated (or implied by a clear commitment like "I'll have that with you by Friday"). Do not invent items not in the source.

3. Every extracted item MUST include a `source_quote` field with verbatim text from the source (30-200 chars).

4. For each action, identify:
   - `owner_candidate`: full name as spoken/named in the source. If only a first name ("Vikram will do X"), use the first name — Agent #2 will resolve to full name via the directory.
   - `due_date_iso`: convert relative references ("by 22 July", "next MANCO", "end of Q3", "Friday", "Monday latest") to YYYY-MM-DD if a concrete date can be inferred using the meeting date as reference. Otherwise leave null and put the relative phrase in `due_label`.
   - `priority`: Critical (regulatory/legal/board-level/vendor concentration issues), High (regulatory-adjacent, cross-forum escalation, or clear delivery blocker), Medium (operational), Low (reporting/coordination)
   - `priority_rationale`: one sentence justifying the priority

5. For risks:
   - If the source explicitly UPLIFTS an existing risk (e.g. "R-041 uplifted from High to Critical"), set is_uplifted=true and record from_rating + rating.
   - If the source adds a NEW risk to the register, set is_new=true and use ID like R-NEW-1.
   - Risks may be raised informally in transcripts ("I'm worried about X"). Capture these too — set is_new=true and rating=null if unassigned.

6. Use short deterministic IDs: D-1, D-2 for decisions; A-1, A-2 for actions.

7. `executive_summary`: 2-3 sentences a CIO can read. Cover the meeting's material outputs (decisions, uplifts, top actions). Reference the forum name.

8. Return VALID JSON matching the provided schema. No prose outside the JSON. No markdown code fences.

9. Do NOT invent facts not in the source. If something is ambiguous, omit it rather than guess.
   EXCEPTION for the `agenda` field: reconstructing topics from unstructured input is expected and encouraged (set agenda_inferred=true).
"""


def _build_user_prompt(minute_text: str, schema_json: dict) -> str:
    """Compose the user turn: schema + minute + instruction."""
    return (
        "Extract a structured meeting record from the minute below.\n\n"
        "Return JSON matching this schema exactly:\n"
        f"```json\n{json.dumps(schema_json, indent=2)}\n```\n\n"
        "Meeting minute:\n"
        "---BEGIN MINUTE---\n"
        f"{minute_text}\n"
        "---END MINUTE---\n\n"
        "Respond with ONLY the JSON object. No prose, no markdown fences, "
        "no explanation. Start with { and end with }."
    )


def _extract_json_object(text: str) -> str:
    """Pull the largest JSON object substring out of the model output.

    Handles cases where the model wraps output in ```json fences or adds prose.
    """
    text = text.strip()
    # Strip markdown fences if present
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    text = text.strip()

    # If it starts with { and ends with }, great
    if text.startswith("{") and text.endswith("}"):
        return text

    # Otherwise find the first { and match it to its last }
    first = text.find("{")
    last = text.rfind("}")
    if first == -1 or last == -1 or last <= first:
        raise ValueError("No JSON object found in model output")
    return text[first : last + 1]


def extract_meeting(
    minute_text: str,
    bedrock_runtime,
    model_id: str = DEFAULT_MODEL_ID,
    temperature: float = 0.1,
    max_tokens: int = 4000,
    verbose: bool = False,
) -> Tuple[MeetingRecord, RunMetadata]:
    """Run the Meeting Intelligence Agent on a minute.

    Args:
        minute_text: plain-text meeting minute (any format the LLM can read)
        bedrock_runtime: boto3 bedrock-runtime client
        model_id: Bedrock model ID (default: Llama 3.3 70B cross-region profile)
        temperature: sampling temperature (low = deterministic, 0.1 recommended)
        max_tokens: max completion tokens
        verbose: log the raw output if True

    Returns:
        (MeetingRecord, RunMetadata)

    Raises:
        ValueError if the model output cannot be parsed even after retry
    """
    schema_json = MeetingRecord.model_json_schema()
    user_prompt = _build_user_prompt(minute_text, schema_json)

    # First attempt
    response = bedrock_runtime.converse(
        modelId=model_id,
        system=[{"text": SYSTEM_PROMPT}],
        messages=[{"role": "user", "content": [{"text": user_prompt}]}],
        inferenceConfig={
            "maxTokens": max_tokens,
            "temperature": temperature,
            "topP": 0.9,
        },
    )

    output_text = response["output"]["message"]["content"][0]["text"]

    if verbose:
        logger.info("Raw model output (first 500 chars):\n%s", output_text[:500])

    # Attempt to parse
    record, retries = _parse_or_retry(
        output_text,
        response,
        bedrock_runtime,
        model_id,
        user_prompt,
        temperature,
        max_tokens,
    )

    # Build metadata (combining tokens if we retried)
    total_in = response["usage"]["inputTokens"]
    total_out = response["usage"]["outputTokens"]
    total_latency = response.get("metrics", {}).get("latencyMs", 0)

    meta = RunMetadata(
        model_id=model_id,
        input_tokens=total_in,
        output_tokens=total_out,
        latency_ms=total_latency,
        estimated_cost_usd=round(
            (
                total_in * LLAMA_33_70B_PRICE_IN_PER_1M
                + total_out * LLAMA_33_70B_PRICE_OUT_PER_1M
            )
            / 1_000_000,
            6,
        ),
        retries=retries,
    )

    return record, meta


def _parse_or_retry(
    output_text: str,
    original_response: dict,
    bedrock_runtime,
    model_id: str,
    user_prompt: str,
    temperature: float,
    max_tokens: int,
) -> Tuple[MeetingRecord, int]:
    """Try to parse; on failure, ask the model to fix its output.

    Returns (record, retries).
    """
    for retry in range(2):
        try:
            json_str = _extract_json_object(output_text)
            data = json.loads(json_str)
            record = MeetingRecord.model_validate(data)
            return record, retry
        except (json.JSONDecodeError, ValidationError, ValueError) as err:
            if retry >= 1:
                raise ValueError(
                    f"Model output failed to parse after 1 retry. "
                    f"Last error: {err}\n"
                    f"Output (first 800 chars):\n{output_text[:800]}"
                )

            logger.warning("Parse failed (attempt %d): %s — retrying", retry + 1, err)

            # Corrective retry
            repair_prompt = (
                f"Your previous response failed to parse with this error:\n"
                f"{err}\n\n"
                f"Return a valid JSON object matching the schema. "
                f"Start with {{ and end with }}. No markdown fences, no prose."
            )
            retry_response = bedrock_runtime.converse(
                modelId=model_id,
                system=[{"text": SYSTEM_PROMPT}],
                messages=[
                    {"role": "user", "content": [{"text": user_prompt}]},
                    {
                        "role": "assistant",
                        "content": [{"text": output_text}],
                    },
                    {"role": "user", "content": [{"text": repair_prompt}]},
                ],
                inferenceConfig={
                    "maxTokens": max_tokens,
                    "temperature": temperature,
                    "topP": 0.9,
                },
            )
            output_text = retry_response["output"]["message"]["content"][0]["text"]

    # Should be unreachable
    raise RuntimeError("Retry loop exited unexpectedly")
