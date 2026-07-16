# Demo Script — AI-Powered Technology Management Tower
## For a 30-minute executive slot (20 min presentation + 10 min Q&A)

**Audience:** MANCO / SteerCo / CIO leadership team
**Fictional company:** Northwind Technology (mid-size UK financial services)
**Total demo time:** 8 minutes (plus 12 minutes of deck framing)
**Read this on a second screen during the presentation.**

---

## 0 · The Night Before

### Setup checklist

- [ ] Test the URL from a fresh browser (Incognito, no cache): `https://<owner>.github.io/audit-slide-update/`
- [ ] Test on the actual laptop and screen you'll present on
- [ ] Have `deck.html` open in one tab and `index.html` open in another
- [ ] Have `docs/qna-cheatsheet.md` open on your phone / second monitor
- [ ] **Optional but recommended:** enable Live Mode in Ask-the-Tower with a Groq key on the presentation laptop only — a single live Q at the end lands well
- [ ] Battery + charger + backup hotspot
- [ ] Water

### Room / Zoom prep

- [ ] Screen share full-window (not desktop) to hide your bookmarks and unread emails
- [ ] Zoom / Teams: turn off notifications
- [ ] Font size in browser: **Ctrl + 0** (default) — the design assumes 100% zoom

### Your posture

Your audience is smart, busy and mostly skeptical of anything with "AI" in the title. Be **specific**, be **cited**, and lean on the PaymentGate story — it's the reason this investment pays for itself.

---

## 1 · Opening (Deck slides 1–3, 3 minutes)

### Slide 1 — Title (30s)

> "I want to show you something we've prototyped that changes how you consume every governance forum and every action in the organisation. Northwind Technology is fictional — the numbers, forums and people are made up — but the shape maps exactly to our real environment. The goal today is a decision on Phase 1 funding."

**Advance to slide 2.**

### Slide 2 — The problem (60s)

> "Today, information is fragmented across five governance forums, ITSM, Jira, email, Teams and SharePoint. Actions live in Word minutes and personal notebooks. Weekly executive reporting takes three-to-five FTE-days per cycle. Cross-forum patterns aren't seen until the quarterly deep-dive. And 30–45% of governance actions are quietly aging past their due dates."

Point at the right-hand card:

> "The cost of this is measured in weeks of decision latency and millions in cloud waste — not just PMO time."

**Advance to slide 3.**

### Slide 3 — The vision (90s)

Read the three cards deliberately.

> "One: AI reads every source — meetings, emails, Teams, SharePoint — and logs the actions into Jira automatically.
> Two: AI reports on those tickets — updates, reminders, dashboards, escalations — Jira is administered by agents, not by people.
> Three: AI analyses documentation to provide cross-source insights to management."

Then land the underline:

> "This works only if Jira is the system of record. Humans decide, agents prepare. That's the pledge."

---

## 2 · Solution shape (Deck slides 4–6, 3 minutes)

### Slide 4 — Three surfaces (30s)

> "The Tower has three surfaces: an Executive Cockpit, an AI-administered Jira, and a natural-language chat called Ask the Tower — all backed by Llama 3.3 70B on AWS Bedrock."

### Slide 5 — Architecture (60s)

Read bottom to top.

> "Every source system stays where it is. We layer ingestion with PII redaction, a knowledge graph on Neptune plus vector search on OpenSearch, an agent runtime on Bedrock AgentCore with a supervisor and nine specialists, and an executive experience layer on top."

> "Serverless-first. Bedrock over PrivateLink. Data stays in our tenant. No training on customer data. Kill switch always available."

### Slide 6 — Nine agents (60s)

Speed-read the nine names.

> "Nine specialist agents. Each one does one narrow thing well, is independently evaluated, and starts life in 'Suggest' mode until we've proved it earns the right to auto-execute for safe paths only."

**Advance to slide 7.**

---

## 3 · The Aha Story (Deck slide 7, 90 seconds)

**This is the emotional core of the pitch. Don't rush.**

> "Let me tell you what happened at Northwind last week — and it's a composite of what happens at every organisation like ours.
>
> Wednesday, Cyber MANCO: a critical vendor SLA breach is discussed — PaymentGate, the merchant gateway. Four breaches in six months, £180 million a year runs through that vendor, and the CISO uplifts the risk from High to Critical.
>
> Friday, Risk MANCO: Third-party concentration is added as a *new* Critical risk. The CRO delegate commissions a treatment plan.
>
> Saturday, Service Management MANCO: Two July P1 incidents are traced to that same vendor. The Payments SIP is accelerated.
>
> Tuesday, SteerCo: The Payments programme is moved to RED. The recovery plan is mandated. Contract exit-clause preparation is authorised."

Pause. Then:

> "Four forums. Six days. Three different senior leaders, in three different systems, working the *same underlying issue*. And nobody saw the whole shape of the story until the Tower's Correlation Agent stitched it together on Saturday morning and drafted the SteerCo decision paper before Monday."

> "This story is the return on investment. Now let me show it to you."

**Advance to slide 8 — Live Demo.**

---

## 4 · Live Demo (8 minutes, ~7 clicks)

**Click the "Open the Tower →" button on slide 8** — it opens the prototype in a new tab.

### Click 1 — Executive Cockpit (60s)

**Land on:** `index.html`

> "This is what our CIO — Ravi Chandran, fictional — sees on Monday morning at 07:00. One page. Health score is 76 out of 100, up three since last week. The AI-generated narrative at the top tells him *why*: delivery is steady, cloud is 6% over plan, Payments has emerging risks."

Point at the strategic initiatives ribbon:

> "Eight strategic initiatives. Six green, two amber, one red. Payments Modernisation is the red one."

Point at the top 5 risks:

> "Top five risks with movement arrows. See R-041 PaymentGate up to Critical — that's the story we just walked through."

Point at the recommendations panel:

> "And at the bottom, four executive recommendations generated by the Executive Reporting Agent, ranked by expected value. He can accept, defer, reject with one click. Human approval remains for material decisions."

Point at the AI footer:

> "Every AI-authored element is footered with the model, confidence grade and a link to the reasoning trace. Nothing is unattributed."

### Click 2 — Meetings link in the top nav

**Land on:** `meetings.html`

> "Every meeting is ingested automatically. Five forums in the last six days. Four have already been processed. One is pending — the Cyber MANCO from Wednesday."

Point at the pending card.

> "Let's watch it get processed."

### Click 3 — Cyber MANCO card

**Land on:** `meeting.html?id=cyber-manco-2026-07-08`

> "This is the raw minute document from Wednesday. On the right, the Tower asks: shall we process this? Four specialist agents will run."

### Click 4 — "Process with Tower" button

**Watch:** the agent chain animates for about 15 seconds.

**Narrate over the animation:**

> "Meeting Intelligence Agent is fetching the transcript from Microsoft Graph, running PII redaction, and structuring the minute...
>
> Action Extraction is now scanning for commitments. Nine candidate actions. It's resolving owners against Entra ID — the org directory — and inferring due dates from context like 'by next MANCO'...
>
> Duplicate Detection is checking every draft against 847 existing open governance tickets. One related item found — an old April action from Cyber MANCO. It won't create a duplicate; it'll link them...
>
> Jira Admin is now drafting the nine tickets with source citations, cross-links to the risk register, and the labels our scheme requires. Ready for review."

Point at the highlighted phrases in the minute paper:

> "Notice on the left: the phrases the agents extracted are now highlighted in the source document. Every ticket traces back to the exact words in the minute."

### Click 5 — "Approve all 9" in the HITL card (30s)

Point at the Teams-style approval card:

> "This is what the governance secretariat sees in Teams. Nine tickets drafted. Seven Grade-A confidence, two Grade-B. One related-item link, one auto-link to the SteerCo agenda. In production, she'd review individually — for the demo, we'll approve all."

**Click "Approve all 9"**

> "Nine tickets created in Jira. Owners notified in Teams. Reminders scheduled at T-3, T-1 and T+0. Risk register updated. Correlation Agent has already flagged this as a cross-forum theme."

### Click 6 — "View Actions Register"

**Land on:** `actions.html`

> "This is the governance actions register. Forty tickets. Every management action, every risk, every decision, every audit finding, every service improvement, every FinOps opportunity — all here."

Point at the AI-administered banner:

> "This register is administered by AI. Ninety-three percent of tickets this week were created by an agent. Every ticket was enriched, reminded, escalated — by the Jira Admin Agent."

Point at the source-distribution bar on the right:

> "See where the actions come from — meetings dominate, but 18% come from email, 9% from Teams chats, 4% from SharePoint documents. The AI reads everywhere. That email from the CFO on Sunday night — it's already a ticket."

Point at the Reminders Queue:

> "And here's the queue for today — eight Teams DMs and escalation emails the Jira Admin Agent will send at 09:00, 09:15 and 10:00. Ravi will see a reminder on his phone for the PaymentGate contract review that's due tomorrow. No PMO analyst had to schedule that."

Optional filter: click "Email" source filter.

> "Filter by email — here are the ones sourced from mailboxes. Note GOV-390 was created from Fiona's Sunday email about third-party concentration. The Action Extraction Agent saw the commitment language and drafted the ticket at 09:34."

### Click 7 — Correlation link in top nav

**Land on:** `correlation.html`

> "And now the punchline — cross-source correlation. This is the PaymentGate story I told you at the start, visualised."

Trace the SVG left-to-right:

> "Cyber MANCO on the left. Risk MANCO. Service MANCO. SteerCo on the right. Twelve items across the four forums, connected by relationship edges. The red line pulsing is the escalation chain."

Point at the "This is what a human would have missed" callout:

> "On Friday, three senior leaders — Priya, Sarah, Ravi — were working the same issue in three different systems. Nobody saw the whole pattern. The Tower did, by Saturday morning."

Point at "What the Tower did":

> "It auto-linked the twelve tickets, consolidated ownership into a single CIO-led track, drafted the SteerCo decision paper on Monday at 08:22, and forecast the recovery-plan slip risk before the meeting even started."

Scroll down to the watchlist grid:

> "Everything else the Correlation Agent is watching — six themes, two silent risks not yet in the GRC register, one three-hop blocker chain."

### Optional Click 8 — Ask the Tower (if time allows, 60s)

**Click "Ask the Tower" in the top nav.**

> "One more thing. Any of you can ask the Tower a question in plain English."

Click the prompt **"Top 3 things I should focus on this week"** in the sidebar.

**Watch the typing indicator + answer stream.**

> "This is a Llama 3.3 70B response, cached for reliability in the demo. Notice: PaymentGate contract review at 78% slip probability, DORA funding release at 62%, FY27 portfolio kick-off. Every claim is cited. Every source is clickable."

If you want to show live: **toggle Live Mode**, ask a freeform question like *"What would happen if we lost Priya Deshmukh next week?"* — a genuine Llama call goes out.

---

## 5 · Return to Deck (Slides 9–12, 3 minutes)

**Switch back to the deck tab.**

### Slide 9 — 90-day plan (60s)

> "First 90 days is foundation plus visible executive wins. Landing zone, DPIA, Jira scheme, three agents in HITL mode, first auto-composed weekly pack in the CIO's inbox on Monday morning of week 12. Go/no-go review at day 90 — MANCO decides Phase 2 funding based on realised metrics, not promises."

### Slide 10 — 12-month roadmap (60s)

> "Twelve months takes us through Foundation, Governance Intelligence, Portfolio and Service, and into Predict and Optimise. All nine agents live by month twelve. Level-three autonomy only on safe, evaluated paths — kill switch always available."

### Slide 11 — ROI (60s)

Point at the four big numbers.

> "£45 million net over three years, base case. Roughly 5× return, payback in fourteen months. Programme cost eleven million over three years — mostly people, not platform."

Point at the annual benefit stripes.

> "Split across four buckets — labour productivity, delivery outcomes, financial optimisation (cloud is the big one), and risk and compliance. Owned by the CFO-tech function. Independent review at month twelve. We only claim it if operational metrics move."

### Slide 12 — Ask (60s)

Read the four decisions.

> "Four decisions from you today. One: sponsorship and the executive mandate that Jira is the system of record. Two: Phase 1 funding of £4.9 million. Three: named champions per forum. Four: a genuine go/no-go review at day 90."

Then close:

> "The kill switch is real. Any autonomy level can be reverted at any time. That's what makes it safe to say yes today."

**Stop.**

---

## 6 · Q&A (10 minutes)

You'll get 5–10 questions. Refer to **`docs/qna-cheatsheet.md`** which drafts answers to the top 20 executive questions.

### The five you must land firmly

1. **"How is this different from Microsoft 365 Copilot?"** — Copilot is personal productivity. The Tower is enterprise governance. Complementary — the Tower publishes a Copilot plugin so users can query it from Word / Outlook.
2. **"What if the AI hallucinates in a MANCO paper?"** — Every AI-authored artefact is HITL-reviewed by the chief-of-staff before publication in Phase 1. Confidence grades A/B/C exposed. Second-model verification on high-stakes outputs. And the kill switch.
3. **"Why Jira and not ServiceNow?"** — Jira already has the automation ecosystem, marketplace, and API maturity we need for governance items. ServiceNow remains our ITSM system of record. The two are integrated.
4. **"What does year one cost us?"** — £4.9M total (see slide 11). Most of it is a 13-FTE build team plus a delivery partner. AWS run cost is ~£180k/year. Bedrock inference ~£1.8k/month at steady state.
5. **"What's our exit strategy?"** — Model Broker abstraction lets us swap Bedrock. Prompts live in Git. Knowledge is in S3 (source-of-truth) and Neptune (index we can rebuild). Jira is where the state lives — nothing exotic. We can walk away in 6 weeks.

---

## 7 · Post-Meeting

- [ ] Email the deck (PDF export from reveal.js: `?print-pdf` on the URL then Ctrl+P) plus the demo URL to attendees within 30 min
- [ ] Log any objections you couldn't answer well — refine the Q&A cheat sheet
- [ ] Schedule the day-90 go/no-go review before you leave the room

## 8 · Failure Modes and Recovery

| If this happens | Do this |
|---|---|
| Wi-Fi drops mid-demo | The site is pure static HTML — it runs offline once the page has loaded. Refresh will fail, but the current tab keeps working. Warn: "we may lose Ask-the-Tower live mode, everything else is fine." |
| Prototype URL is 404 | Deploy is broken — recover with a screen recording of the demo on your laptop, or walk through the deck's slide 7 in detail. |
| An exec asks a hostile question you can't answer | *"That's a good question and I want to give you a properly considered answer rather than an off-the-cuff one. Let me follow up by Thursday."* Then actually do. |
| Groq live-mode returns an error | Toggle Live Mode off. Cached responses still work. Move on. |
| Someone challenges the £45M number | Refer to slide 11's benefit categories. Highlight cloud waste (£340k/yr identified today) as the closest verifiable slice. |

You're ready. Go win the room.
