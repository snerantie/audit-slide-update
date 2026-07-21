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

# Pricing (USD per 1M tokens) as of last check. Update if AWS changes.
# Used only for the estimated_cost_usd figure in RunMetadata — not billing.
LLAMA_33_70B_PRICE_IN_PER_1M = 0.72
LLAMA_33_70B_PRICE_OUT_PER_1M = 0.72


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
