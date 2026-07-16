# Q&A Cheat Sheet — Technology Management Tower

The top 20 questions senior executives ask on this pitch, with a drafted 30–60 second answer for each. Skim these once before the meeting; keep the file open on a second screen during Q&A.

---

## Product & scope

### Q1 · How is this different from Microsoft 365 Copilot?

Copilot is **personal productivity** — my inbox, my meetings, my documents. The Tower is **enterprise governance** — our organisation, our portfolio, our risk posture, our Jira.

Copilot doesn't cross forums, doesn't administer Jira, doesn't correlate risks across sources, doesn't produce a MANCO paper with cited enterprise data. It can't tell you the PaymentGate story.

They are complementary. We publish a Copilot plugin so users can invoke Ask-the-Tower from Word or Outlook. We're extending Copilot's reach, not competing with it.

---

### Q2 · What about our existing BI tool — Power BI / Tableau?

The Tower doesn't replace BI. BI shows you *numbers*; the Tower gives you *narrative + numbers + actions*, grounded in unstructured data (meetings, emails, docs) that BI can't reach.

We embed Power BI / QuickSight tiles inside the Cockpit where they earn their place. The dashboard is one pane of glass over multiple sources — BI is one of the sources.

---

### Q3 · Why Jira and not ServiceNow?

Because Jira already has the mature marketplace, automation and API surface for governance items — actions, decisions, risks, audit findings. ServiceNow remains the ITSM system of record for incidents / problems / changes; the Tower reads it via API.

We're not migrating anything. We're choosing the right tool for governance-item workflows. If your governance actions already sit in ServiceNow, we can flip the scheme — the agent architecture is the same either way.

---

### Q4 · What if we don't want to use AWS?

The design is **portable by construction**. Bedrock sits behind a Model Broker abstraction. Prompts and evaluations live in Git. Knowledge base content is authoritative in S3 and reproducible; the vector index is derivative.

Swap to Azure OpenAI or on-prem Llama and the specialist-agent contracts are unchanged. Estimated switching effort: 4–6 sprint weeks. We picked Bedrock because it gives us Llama, Claude, Nova and Titan on one API, with PrivateLink and Guardrails out of the box — but we're not welded to it.

---

## Trust, risk & regulation

### Q5 · What if the AI hallucinates in a MANCO paper?

Three layers of defence:

1. **Human-in-the-loop for material outputs.** Every AI-authored artefact — draft ticket, MANCO paper, exec pack — is reviewed by a named human (chief-of-staff or secretariat) before publication in Phases 1 and 2. Autonomy is earned per agent per path.
2. **Second-model verification.** High-stakes outputs are drafted by Llama and verified by Claude 3.5 (or vice versa). Divergence flags a HITL escalation.
3. **Confidence grades and citations on every claim.** Grade A / B / C exposed in the UI. Every executive-facing sentence has a source chip.

And the **kill switch** is real — one click reverts autonomy to previous level or disables the agent entirely.

---

### Q6 · What data does the AI see? Privacy?

Only what's needed for governance.

- **Yes:** governance forum minutes (Teams transcripts, SharePoint documents), governance secretariat mailboxes, allowlisted governance Teams channels, Jira, ServiceNow, FinOps, GRC.
- **No:** personal inboxes, personal chats, HR-sensitive systems, customer data.
- **Redaction on persistence.** PII is redacted before vectorisation and storage. Raw content stays in the source system.
- **Least-privilege permissions** in Entra ID, scoped via Sites.Selected on SharePoint and application access policies on Teams.
- **DPIA on file** before ingestion; DPO signs off per new data source.

---

### Q7 · Regulatory concerns — DORA, EU AI Act, GDPR?

Designed for these from Day 1, not retrofitted.

- **GDPR / UK-GDPR:** Article 22 respected — no solely automated decisions with material effect. Right of erasure supported. DPIA in place.
- **EU AI Act:** we maintain a register of AI systems. Most agents are *limited risk* (governance productivity with human oversight). Transparency notices where users interact with AI. Human oversight documented per agent.
- **DORA:** the Tower actually *helps* DORA compliance — continuous ICT third-party register, evidence pre-assembly, incident-reporting flow. See the DORA correlation loop in the demo.
- **Sector overlays** (APRA CPS 234, PRA SS1/23, PCI DSS): accommodated in the compliance and MRM design.
- **SOC 2 Type II** attestation targeted within 12 months. **ISO/IEC 42001** (AI management system) within 18–24 months.

---

### Q8 · What if a critical decision is made based on wrong AI output?

Same accountability model as today: the decision belongs to the executive who made it, not the tool that informed them. The Tower doesn't decide — it *prepares* material for humans to decide.

But we go further: **every AI-authored artefact is auditable**. Prompt, model, inputs, outputs, tools called, HITL decision — all captured in an immutable ledger (S3 Object Lock, 7-year retention). If a bad decision traces back to the Tower, we can reconstruct exactly what happened.

---

### Q9 · What if a model provider changes their terms?

We have contractual assurance from AWS Bedrock that customer data isn't used to train foundation models. If Meta / Anthropic / Amazon changed their terms in a way we can't accept, the Model Broker abstraction lets us swap in ~6 weeks.

We also maintain **quarterly vendor reviews** for the foundation-model providers, tracked in the Audit & Risk Agent as R-041 stablemates.

---

## Money & value

### Q10 · What does year 1 really cost?

**Total ~£4.9M** for year 1, broken down:

| Line | Year 1 |
|---|---|
| Build team (13 FTE, blended £220k) | £2.9M |
| Delivery partner | £0.6M |
| AWS platform + Atlassian premium | £0.6M |
| Bedrock inference (real, not hypothetical) | £0.15M |
| Change & adoption | £0.3M |
| Legal / DPO / assurance | £0.2M |
| Contingency (15%) | £0.6M |

At steady state (year 3+) run cost drops to ~£2.5M/year. Bedrock inference at scale is under £2k/month.

---

### Q11 · Where does the £45M really come from? Which slice is most solid?

The most verifiable slice is **cloud FinOps** — the Cloud Optimisation Agent's outputs are testable against actual invoices in ~30 days. Today's demo shows £340k/yr already identified with named owners. Industry benchmarks say 15–25% of cloud spend is waste; at £40M cloud spend that's £6–10M/year of the £45M.

Second-most verifiable is **labour productivity** — measure secretariat hours per meeting before and after. Baseline captured on Day 1 (see the 90-day plan).

Third: **delivery outcomes** — harder to attribute but shows up in schedule adherence and dedup. This is where independent finance review at month 12 matters.

We're not going to claim any of it unless the operational metrics move.

---

### Q12 · How do we measure success beyond ROI?

Six non-financial KPIs, measured monthly:

1. **Decision latency** — issue-raised to decision-recorded (target: 60–80% reduction)
2. **Action closure rate** — within due date (target: +25–40pp)
3. **Cross-forum dependency visibility** — named dependencies per programme (target: 3–5× today)
4. **Audit-finding closure predictability** (target: +30–50pp)
5. **Executive NPS on the Tower** (target: +40)
6. **Employee experience in PMO/secretariat** ("governance is a burden" pulse — target: 40–60% reduction)

Reported in the CIO's monthly ExCo pack.

---

## Adoption & people

### Q13 · How does this affect job security in PMO / secretariat teams?

Roles don't disappear — they change.

- **Secretariat** shifts from typing minutes to curating agent outputs and running the governance forums better.
- **PMO analysts** shift from action-chasing to portfolio analysis and executive support.
- **EA team** shifts from compliance reporting to shaping decisions.
- **Service Management** shifts from monthly reports to continuous improvement.

Head-count plan is public. Nobody is losing their job because of the Tower. But **new roles emerge** — AI Assurance Lead, prompt engineers, an evaluation function — those come out of existing capacity plus 2–4 new hires.

This is a message that lands better when you name the people you're protecting. Do that.

---

### Q14 · Adoption is going to be hard. How do we handle it?

Three levers:

1. **Executive mandate that Jira is the system of record.** Non-negotiable, from Day 1. The Tower is optional; Jira as SoR is not.
2. **Champions network.** One senior owner per governance forum. They evangelise inside their forum. Named on Day 30.
3. **Kill switch and manual fallback.** Confidence to *use* the Tower rests on confidence to *turn it off*. The pre-Tower governance process is documented and rehearsed — anyone can revert at any time.

We've seen this pattern work: the day-90 outcomes are visible enough that adoption becomes pull, not push.

---

### Q15 · What happens if key people leave — is the knowledge trapped in agents?

The opposite — the Tower *institutionalises* the knowledge that today lives in senior analysts' heads and OneNote files.

- **Prompts and evaluation sets in Git**, versioned, reviewed by ARB.
- **Knowledge graph in Neptune** — the schema is documented and portable.
- **Agent runbooks** in Confluence, published by every squad.
- **Contract with the AI Platform team** to own agent SLAs "you build it, you run it".

If our AI Platform Lead left tomorrow, a new hire could be productive in two weeks.

---

## Technical & strategic

### Q16 · Vendor lock-in — what are we locking into?

We deliberately keep the lock-in narrow:

- **AWS Bedrock** — but with Model Broker abstraction (see Q4).
- **Atlassian Jira Cloud** — this is genuine lock-in, but it's a strategic bet: Jira gives us governance workflow at scale better than the alternatives.
- **Microsoft 365** — already committed as our primary workspace.
- **Neptune** — the graph model is portable to Neo4j or Amazon RDS pgvector if needed.

The parts most likely to change (models, prompts, agent behaviour) are the parts we've made most portable. The parts we lock into are the parts we already depend on.

---

### Q17 · Why now, versus waiting 12 months for the AI market to settle?

Two reasons.

**First, the market won't settle.** Models get better every quarter but the enterprise architecture pattern — RAG, agents, guardrails, HITL — is now well-established. Delaying doesn't materially change the design.

**Second, the value is deferred, not saved.** Every month we wait we lose ~£1.2M in benefits (labour + cloud + delivery). At a 14-month payback, delaying twelve months means we miss a full breakeven cycle.

We're not on the bleeding edge — we're on the mature, evaluated, governed edge. That's the right place for enterprise adoption.

---

### Q18 · Why the fictional Northwind Technology? Isn't real data more convincing?

Two reasons.

**First, safety.** For a demo shared beyond this room, using real names / risks / vendors would be a data-protection issue. Fictional stays clean.

**Second, calibration.** The Northwind numbers are calibrated to look like *us* — 3,500 tech staff, £240M spend, mid-sized financial services. If anything, we've tuned it *conservatively*. Real deployment shows numbers that map or exceed.

Happy to run a two-week discovery post-approval and produce an internal calibrated version with your actual programme names — the design doesn't change.

---

### Q19 · What's the biggest risk you're not surfacing?

Honest answer: **executive attention risk**.

The Tower only works if the CIO's leadership team actually uses it — reads the Monday pack, acts on the recommendations, respects the HITL queue. If leadership treats it as "another dashboard we don't check", the whole value case erodes.

Mitigations: champions network, weekly demo cadence for the first quarter, executive coaching on how to use the Tower well, and — crucially — a go/no-go review at Day 90 that lets you kill it cheaply if adoption stalls.

The second-biggest risk is data quality — CMDB and ownership metadata weakness. That's addressed by a parallel data-quality remediation stream in Phase 2, which the Tower actively pushes ("this ticket has no accountable owner in Entra ID — please assign").

---

### Q20 · What's our exit strategy?

Cleanest exit path in any enterprise system I've designed:

1. **Turn off write agents** — global kill switch. Governance keeps running manually.
2. **Export Jira** — the state is already in Jira. Nothing to migrate.
3. **Preserve source data** — S3 buckets retained per retention policy.
4. **Neptune / OpenSearch** — decommission; can be rebuilt from S3 if needed later.
5. **Bedrock** — no residual dependency. Model providers see no more traffic.

Realistic timeline to full decommission: **6 weeks**. Sunk cost: the £4.9M of Phase 1 build. That's the maximum downside.

The parts of the Tower that are *worth keeping* if we stop mid-programme — the Jira scheme, the DPIA, the governance process discipline — stay useful either way.

---

## After the meeting

Log which questions actually came up. Update this cheat sheet before the next audience.

*And remember: half the exec's questions are really "convince me this is safe". Every answer above should end with a demonstrable safeguard.*
