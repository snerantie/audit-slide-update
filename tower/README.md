# Technology Management Tower — Real Agents

**Level-1 proof-of-concept.** Real AWS Bedrock calls. Real Llama 3.3 70B. Real structured output. First agent: Meeting Intelligence.

Not a demo — actual working code. Small, clean, evaluable. Foundation for the next 8 agents.

## What's here

```
tower/
├── src/
│   ├── schemas.py                  Pydantic models for structured output
│   ├── bedrock_client.py           AWS Bedrock client with auth ladder
│   └── agents/
│       └── meeting_intelligence.py Agent #1
├── samples/                        5 sample meeting minutes (fictional Northwind)
├── golden_set/                     Hand-labelled expected outputs for eval
├── notebooks/
│   └── 01-meeting-intelligence.ipynb   ← Open this
├── requirements.txt
├── .env.example
└── README.md (this file)
```

## Prerequisites

### 1. AWS Bedrock access

- AWS account with Bedrock enabled in your region (recommend `us-east-1`)
- Bedrock model access granted for **Meta Llama 3.3 70B Instruct**:
  - AWS Console → Bedrock → Model access → Modify model access
  - Tick "Meta Llama 3.3 70B Instruct" → Save (instant approval)
- IAM permissions: `bedrock:InvokeModel`, `bedrock:Converse`, `bedrock:ListFoundationModels`

### 2. Python 3.11+ with dependencies

```bash
cd tower
pip install -r requirements.txt
```

## How to run

### Google Colab (recommended for the POC)

**One click to open, then run cells top to bottom:**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/snerantie/audit-slide-update/blob/real-agents/meeting-intelligence/tower/notebooks/01-meeting-intelligence.ipynb)

The first cell auto-detects Colab, clones this repo, installs dependencies. You'll paste your AWS keys once (via `getpass`; they stay in the notebook session only). Then just run cells.

### Other environments (also supported by the same notebook)

- **Amazon SageMaker Studio** — upload the `tower/` folder, open the notebook. Auth is automatic via the Studio execution role.
- **Local Jupyter / VS Code / Cursor** — `pip install -r requirements.txt`, then open the notebook. Uses `~/.aws/credentials` if `aws configure` has been run.

Run cells top to bottom.

## Expected output

After running all cells:

```
Bedrock is live.
Extracted in 4.2s
  Tokens: 3,914 in / 1,105 out
  Cost:   $0.00362
  ...
  Forum:       Cyber MANCO
  Date:        2026-07-08
  Decisions:   3
  Risks:       2
  Actions:     9
```

## Cost

- ~$0.005 per meeting at Llama 3.3 70B on Bedrock
- Full run against 5 samples: ~$0.03
- Set a budget alarm at $1/day for peace of mind

## Design principles

1. **Structured output** — every response is validated against a Pydantic schema. Malformed responses trigger a corrective retry (max 1).
2. **Source citations** — every extracted decision, risk, action carries a verbatim `source_quote`. Downstream Jira tickets will link back to this.
3. **Model portability** — swap Bedrock for another provider by changing one function in `bedrock_client.py`. Prompts are in Git.
4. **Progressive autonomy** — this agent runs at L1 today (extract, verify by hand). Graduation to L2 (HITL approve) requires the evaluation harness to pass consistent thresholds.
5. **Auditability** — every run returns `RunMetadata` with model ID, tokens, latency, cost, retries. Persist these to satisfy the audit-ledger requirement.

## What's next

- **Agent #2 — Action Extraction**: takes `MeetingRecord.actions[]` and enriches each with directory-resolved owners, ISO-parsed due dates, duplicate detection against Jira.
- **Agent #3 — Jira Administration**: creates real tickets via Atlassian REST API. Adds source citations, cross-links, HITL confirmation for state changes.

Both are ~1-2 days of build each, following the same pattern established here.

## Iteration ideas for Agent #1

1. **Refine prompts** — edit `src/agents/meeting_intelligence.py` and rerun. Try adding few-shot examples of tricky extractions.
2. **Add verifier** — pass Llama output through Claude 3.5 Sonnet with a "score this and list missing items" prompt. Reflect-and-verify.
3. **Test with real minutes** — drop a redacted minute from your organisation in `samples/` and run. See how close it gets on your first pass.
4. **Extend schema** — add fields like sentiment, agenda-item overrun, dependency graph edges.
5. **Golden set** — flesh out `golden_set/` with expected outputs for all 5 samples so eval covers more.

## Troubleshooting

**"AccessDeniedException" on `converse`**
Model access not enabled. AWS Console → Bedrock → Model access → tick Meta Llama 3.3 70B Instruct → Save.

**"ValidationException: The provided model identifier is invalid"**
The model ID has region prefix (`us.` / `eu.`) that doesn't match your region. Change `MODEL_ID` in the notebook:
- `us-east-1` / `us-west-2` → `us.meta.llama3-3-70b-instruct-v1:0`
- `eu-west-1` / `eu-west-2` → `eu.meta.llama3-3-70b-instruct-v1:0`

**"ExpiredTokenException"**
SSO/STS credentials expired. Run `aws sso login` or refresh env vars.

**Model output fails to parse (both attempts)**
Check `verbose=True` in the `extract_meeting` call to log raw output. Usually the fix is a system prompt tweak.

**Costs higher than expected**
Check `RunMetadata.retries` — if consistently > 0, the prompt is producing malformed JSON. Tighten the schema or add few-shot examples.
