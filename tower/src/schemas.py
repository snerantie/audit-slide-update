"""Pydantic schemas for the structured output of the Meeting Intelligence Agent.

These schemas double as:
  - Runtime validation of LLM output
  - JSON Schema handed to the LLM as part of the prompt
  - Downstream contract for the Action Extraction and Jira Admin agents

Design principle: every extracted item MUST carry a source_quote — verbatim text
from the minute. This is what makes the output auditable end-to-end.
"""

from __future__ import annotations

from datetime import date
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class Priority(str, Enum):
    """Priority levels aligned with the Tower's governance scheme."""

    critical = "Critical"
    high = "High"
    medium = "Medium"
    low = "Low"


class Attendee(BaseModel):
    """A single attendee or apology at a governance meeting."""

    name: str = Field(description="Full name as it appears in the minute")
    role: Optional[str] = Field(
        default=None,
        description="Job title or forum role (e.g. 'CISO', 'Chair', 'Secretariat')",
    )
    attended: bool = Field(
        default=True,
        description="True if attended, False if apology/regret",
    )


class Decision(BaseModel):
    """A formal decision recorded in the minutes."""

    id: str = Field(description="Short deterministic ID: D-1, D-2, etc.")
    text: str = Field(description="The decision as recorded")
    agenda_item: Optional[str] = Field(
        default=None, description="Which agenda item the decision belongs to"
    )
    owned_by: Optional[str] = Field(
        default=None, description="Named accountable person, if identifiable"
    )
    source_quote: str = Field(description="Verbatim quote from the minute")


class Risk(BaseModel):
    """A risk raised, uplifted or ratified during the meeting."""

    id: str = Field(
        description=(
            "Existing risk ID (e.g. R-041) if the minute references one; "
            "otherwise a proposed ID like R-NEW-1"
        )
    )
    title: str = Field(description="Short descriptive title of the risk")
    rating: Optional[str] = Field(
        default=None,
        description="Current rating: Critical / High / Medium / Low if stated",
    )
    from_rating: Optional[str] = Field(
        default=None,
        description="Previous rating if the risk was uplifted or downgraded",
    )
    is_new: bool = Field(
        default=False,
        description="True if this risk is being added to the register for the first time",
    )
    is_uplifted: bool = Field(
        default=False, description="True if the meeting uplifted an existing risk"
    )
    driver: Optional[str] = Field(
        default=None, description="Brief explanation of why the risk changed"
    )
    source_quote: str = Field(description="Verbatim quote from the minute")


class Action(BaseModel):
    """An action item with owner, due date, and priority."""

    id: str = Field(description="Short deterministic ID: A-1, A-2, etc.")
    text: str = Field(description="Clear description of what is to be done")
    owner_candidate: str = Field(
        description="Full name of accountable person as identified in the minute"
    )
    due_date_iso: Optional[str] = Field(
        default=None,
        description="Due date in YYYY-MM-DD format, if a specific date can be inferred",
    )
    due_label: str = Field(
        description=(
            "Human-readable due, e.g. '22 Jul', '9 Jul (tomorrow)', "
            "'next MANCO', 'end of Q3'"
        )
    )
    priority: Priority = Field(description="Assigned priority")
    priority_rationale: str = Field(
        description="One-sentence justification for the priority assignment"
    )
    agenda_item: Optional[str] = Field(
        default=None, description="Which agenda item the action belongs to"
    )
    source_quote: str = Field(description="Verbatim quote from the minute")


class DiscussionTopic(BaseModel):
    """A substantive discussion point that isn't an action, decision or risk."""

    topic: str = Field(description="Short label")
    summary: str = Field(description="One-to-two sentence summary")
    agenda_item: Optional[str] = None


class MeetingRecord(BaseModel):
    """Top-level structured record extracted from a governance meeting minute."""

    # Identity
    forum: str = Field(description="Name of the forum (e.g. 'Cyber MANCO', 'SteerCo')")
    date_iso: str = Field(description="Meeting date in YYYY-MM-DD format")
    time_label: Optional[str] = Field(
        default=None, description="Human-readable time, e.g. '14:00-15:30 BST'"
    )
    chair: str = Field(description="Chair's name and role")

    # Participants
    attendees: List[Attendee] = Field(default_factory=list)

    # Agenda — explicit if stated in source, otherwise inferred from topic flow
    agenda: List[str] = Field(
        default_factory=list,
        description=(
            "Ordered agenda items — explicit if the source states them, "
            "otherwise topic segments inferred from the flow of discussion"
        ),
    )
    agenda_inferred: bool = Field(
        default=False,
        description=(
            "True if the agenda was reconstructed from meeting content rather "
            "than being explicitly stated in the source. Downstream systems "
            "can flag inferred agendas for human review."
        ),
    )

    # Structured extraction (the point of the agent)
    decisions: List[Decision] = Field(default_factory=list)
    risks: List[Risk] = Field(default_factory=list)
    actions: List[Action] = Field(default_factory=list)
    discussions: List[DiscussionTopic] = Field(default_factory=list)

    # Executive-facing summary (composed by the agent)
    executive_summary: str = Field(
        description=(
            "Two to three sentences suitable for the exec pack — covering "
            "the meeting's decisions, risks and material actions"
        )
    )
    unresolved_questions: List[str] = Field(
        default_factory=list,
        description="Explicitly-noted open questions or items deferred to next meeting",
    )


class RunMetadata(BaseModel):
    """Metadata about a single Bedrock invocation — used for cost + audit."""

    model_id: str
    input_tokens: int
    output_tokens: int
    latency_ms: int
    estimated_cost_usd: float
    retries: int = 0

    @classmethod
    def from_bedrock_response(
        cls, response: dict, model_id: str, cost_per_1m_in: float, cost_per_1m_out: float
    ) -> "RunMetadata":
        """Build metadata from a Bedrock Converse API response."""
        usage = response.get("usage", {})
        in_tok = usage.get("inputTokens", 0)
        out_tok = usage.get("outputTokens", 0)
        latency = response.get("metrics", {}).get("latencyMs", 0)
        cost = (in_tok * cost_per_1m_in + out_tok * cost_per_1m_out) / 1_000_000
        return cls(
            model_id=model_id,
            input_tokens=in_tok,
            output_tokens=out_tok,
            latency_ms=latency,
            estimated_cost_usd=round(cost, 6),
        )
