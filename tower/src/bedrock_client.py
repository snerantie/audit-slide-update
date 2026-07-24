"""Bedrock client with a robust auth ladder.

Works in every notebook environment we care about:
  1. SageMaker Studio / Cloud9 / EC2 with IAM role  → uses role
  2. Local Jupyter with `aws configure` already run  → uses ~/.aws/credentials
  3. Google Colab / anything with env vars           → uses env vars
  4. Explicit credentials passed to the function     → uses those

Also verifies Bedrock is reachable and that the target model is available before
we try to invoke it — so failures happen fast with clear error messages.
"""

from __future__ import annotations

import logging
import os
from typing import Optional, Tuple

import boto3
from botocore.config import Config
from botocore.exceptions import ClientError, NoCredentialsError

logger = logging.getLogger(__name__)

# Default model. Cross-region inference profile — required for Llama 3.3 70B
# on most Bedrock regions. Override via `model_id` param if you have direct
# model access in your region.
DEFAULT_MODEL_ID = "us.meta.llama3-3-70b-instruct-v1:0"

# Backwards-compat: the old Llama pricing constants are still exported so
# existing imports don't break. New code should use `get_pricing(model_id)`.
LLAMA_33_70B_PRICE_IN_PER_1M = 0.72
LLAMA_33_70B_PRICE_OUT_PER_1M = 0.72

# Approximate per-1M-token pricing (USD) for common Bedrock models.
# For cost-estimate display only — actual billing is on your AWS invoice.
# Numbers are the AWS-published or provider-published list rates as of the
# last update. Update by editing this map when providers change prices.
MODEL_PRICING: dict = {
    # Meta Llama family
    "llama3-3-70b":  {"in": 0.72,  "out": 0.72},
    "llama3-1-70b":  {"in": 0.72,  "out": 0.72},
    "llama3-1-8b":   {"in": 0.22,  "out": 0.22},
    "llama3-2-90b":  {"in": 0.72,  "out": 0.72},

    # Anthropic Claude family
    "claude-3-5-sonnet": {"in": 3.00, "out": 15.00},
    "claude-3-5-haiku":  {"in": 0.80, "out": 4.00},
    "claude-3-haiku":    {"in": 0.25, "out": 1.25},

    # Amazon Nova family (cheapest AWS-native)
    "nova-micro": {"in": 0.035, "out": 0.14},
    "nova-lite":  {"in": 0.06,  "out": 0.24},
    "nova-pro":   {"in": 0.80,  "out": 3.20},

    # Zhipu GLM family (approximate — verify against Bedrock console pricing panel)
    "glm-4-flash":     {"in": 0.03, "out": 0.10},
    "glm-4.5-flash":   {"in": 0.03, "out": 0.10},
    "glm-4.7-flash":   {"in": 0.03, "out": 0.10},   # confirmed by user in Bedrock eu-west-1
    "glm-4-plus":      {"in": 0.50, "out": 1.50},
    "glm-4":           {"in": 0.05, "out": 0.15},

    # DeepSeek family
    "deepseek-v3": {"in": 0.14, "out": 0.28},
    "deepseek-r1": {"in": 0.55, "out": 2.19},

    # Alibaba Qwen family
    "qwen3-32b":  {"in": 0.15, "out": 0.60},
    "qwen3-72b":  {"in": 0.30, "out": 1.20},

    # Mistral (Bedrock)
    "mistral-large": {"in": 4.00, "out": 12.00},
}


def get_pricing(model_id: str) -> dict:
    """Return the pricing dict {in, out} for a model ID (USD per 1M tokens).

    Matches loosely by scanning the model ID for known substrings.
    Falls back to Llama 3.3 70B pricing if unknown, and prints a warning.
    """
    # Strip region-prefix like "us.", "eu.", "ap."
    core = model_id.split(".", 1)[1] if "." in model_id and model_id.split(".", 1)[0] in {"us", "eu", "ap"} else model_id

    for key, pricing in MODEL_PRICING.items():
        if key in core.lower().replace(".", "-"):
            return pricing

    # Fallback with warning
    print(f"[pricing] Unknown model '{model_id}' — falling back to Llama 3.3 70B pricing for the estimate.")
    return {"in": LLAMA_33_70B_PRICE_IN_PER_1M, "out": LLAMA_33_70B_PRICE_OUT_PER_1M}


def get_bedrock_clients(
    region: str = "us-east-1",
    aws_access_key_id: Optional[str] = None,
    aws_secret_access_key: Optional[str] = None,
    aws_session_token: Optional[str] = None,
    profile_name: Optional[str] = None,
    verbose: bool = True,
) -> Tuple[object, object]:
    """Return (bedrock_runtime_client, bedrock_client) for the given region.

    The auth ladder:
        1. Explicit keys passed to this function
        2. AWS profile name passed to this function
        3. AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY env vars
        4. Default credential chain (~/.aws/credentials, IAM role, EC2 metadata)

    Returns:
        (bedrock_runtime, bedrock) — the -runtime client for invocations,
        the bedrock client for administrative calls like ListFoundationModels.

    Raises:
        RuntimeError with a clear message if no credentials are usable.
    """
    config = Config(
        region_name=region,
        retries={"max_attempts": 3, "mode": "standard"},
        connect_timeout=10,
        read_timeout=120,
    )

    session_kwargs = {"region_name": region}
    auth_source = "unknown"

    if aws_access_key_id and aws_secret_access_key:
        session_kwargs.update(
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
        )
        if aws_session_token:
            session_kwargs["aws_session_token"] = aws_session_token
        auth_source = "explicit-keys"
    elif profile_name:
        session_kwargs["profile_name"] = profile_name
        auth_source = f"profile:{profile_name}"
    elif os.environ.get("AWS_ACCESS_KEY_ID"):
        auth_source = "env-vars"
    else:
        auth_source = "default-chain (role or ~/.aws/credentials)"

    try:
        session = boto3.Session(**session_kwargs)
        bedrock_runtime = session.client("bedrock-runtime", config=config)
        bedrock = session.client("bedrock", config=config)
    except NoCredentialsError as e:
        raise RuntimeError(
            "AWS credentials not found. Try one of:\n"
            "  - Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars\n"
            "  - Run `aws configure` if you have the AWS CLI\n"
            "  - Pass explicit keys: get_bedrock_clients(aws_access_key_id=..., ...)\n"
            "  - Run this notebook in SageMaker Studio (uses execution role)\n"
            f"Original error: {e}"
        ) from e

    if verbose:
        # Confirm identity without exposing secrets
        try:
            sts = session.client("sts", region_name=region)
            identity = sts.get_caller_identity()
            print(f"AWS auth source: {auth_source}")
            print(f"AWS account:     {identity.get('Account')}")
            print(f"AWS ARN:         {identity.get('Arn')}")
            print(f"AWS region:      {region}")
        except Exception as e:
            logger.warning(f"Could not verify identity via STS: {e}")

    return bedrock_runtime, bedrock


def verify_model_access(
    bedrock_client,
    model_id: str = DEFAULT_MODEL_ID,
    verbose: bool = True,
) -> bool:
    """Confirm the target model is enabled for this account in this region.

    Returns True if the model is accessible, False otherwise (with a helpful
    message printed if verbose=True).
    """
    try:
        # If it's a cross-region inference profile ID (e.g. "us.meta..."), the
        # ListFoundationModels API won't return it directly — but ListInferenceProfiles
        # will. We try both.
        base_model_id = model_id.split(".", 1)[1] if model_id.startswith(("us.", "eu.", "ap.")) else model_id

        models = bedrock_client.list_foundation_models(byProvider="meta")
        available = [m["modelId"] for m in models.get("modelSummaries", [])]

        if base_model_id in available:
            if verbose:
                print(f"Model access verified: {model_id}")
            return True

        # If not directly available, check via inference profile
        if model_id.startswith(("us.", "eu.", "ap.")):
            try:
                profiles = bedrock_client.list_inference_profiles()
                profile_ids = [
                    p["inferenceProfileId"]
                    for p in profiles.get("inferenceProfileSummaries", [])
                ]
                if model_id in profile_ids:
                    if verbose:
                        print(f"Model access verified via inference profile: {model_id}")
                    return True
            except Exception as e:
                logger.debug(f"ListInferenceProfiles failed: {e}")

        if verbose:
            print(f"Model {model_id} NOT accessible.")
            print(f"   Available Meta models in this region: {available[:5]}...")
            print(f"   Action: AWS Console -> Bedrock -> Model access -> enable Meta Llama 3.3")
        return False

    except ClientError as e:
        code = e.response["Error"]["Code"]
        if code == "AccessDeniedException":
            if verbose:
                print(f"IAM permission missing: bedrock:ListFoundationModels")
                print(f"   The runtime call may still work; skipping this check.")
            return True  # Assume caller knows what they're doing
        if verbose:
            print(f"Bedrock check failed: {code} — {e.response['Error']['Message']}")
        return False


def smoke_test(bedrock_runtime, model_id: str = DEFAULT_MODEL_ID) -> str:
    """One-shot round trip to prove Bedrock invocation works.

    Returns the raw text output. Should be exactly 'OK' (or very close).
    Raises if the call fails.
    """
    response = bedrock_runtime.converse(
        modelId=model_id,
        messages=[
            {
                "role": "user",
                "content": [
                    {"text": "Reply with exactly this word and nothing else: OK"}
                ],
            }
        ],
        inferenceConfig={"maxTokens": 10, "temperature": 0.0},
    )
    text = response["output"]["message"]["content"][0]["text"].strip()
    return text
