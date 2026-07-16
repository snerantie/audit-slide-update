# Technology Management Tower — Executive Demo

An interactive prototype of the **AI-powered Technology Management Tower** for CIOs and Management Committees. Built to be shown live to senior management.

## What This Is

A clickable prototype that walks executives through the operating loop:

**Governance meetings → AI analysis → Actions in Jira → Follow-up → Executive Cockpit**

Fictional company: **Northwind Technology** (mid-size financial services, 3,500 tech staff, £240M spend).

## Demo Walkthrough (8 minutes)

| # | Screen | What to click | Talking point |
|---|---|---|---|
| 1 | Executive Cockpit (`index.html`) | Land here | "This is what the CIO sees Monday morning — one page, cited, actionable." |
| 2 | Meeting Library (`meetings.html`) | "Meetings" in nav | "5 governance forums, all ingested last week." |
| 3 | Meeting Deep-Dive (`meeting.html?id=cyber-manco-2026-07-08`) | Click Cyber MANCO → "Process with Tower" | "Watch the agents extract structure — decisions, risks, actions, owners, due dates." |
| 4 | HITL Approval | Approve tickets in the card | "Secretariat approves 7 tickets in 60 seconds vs. 2 hours of typing." |
| 5 | Actions Register (`actions.html`) | Actions in nav | "Every governance action in one register. Filter by forum, owner, age." |
| 6 | Cross-Forum Correlation (`correlation.html`) | "The PaymentGate story" | "The Tower's superpower — cross-source correlation no human could do at pace." |
| 7 | Ask the Tower (`ask.html`) | Type a question | "Cited, natural-language answers. Powered by Llama 3.3 70B." |
| 8 | Deck (`deck.html`) | Optional — the narrative | "Same content in slide form for the leave-behind." |

## Tech Stack

- Static HTML + Tailwind CSS (via CDN) + Alpine.js (via CDN) — no build step, hosted on GitHub Pages
- Llama 3.3 70B responses via **Groq** free tier (cached for reliability; optional live-mode via a Cloudflare Worker)
- All data is fictional and lives in this repo — nothing confidential

## Running Locally

```bash
# Any static server works — e.g.
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploying to GitHub Pages

1. **Settings → Pages** in this repo
2. **Source:** Deploy from a branch
3. **Branch:** `demo/tower-prototype` / root
4. Save. URL will be `https://snerantie.github.io/audit-slide-update/`

## File Map

```
/
├── index.html               Executive Cockpit — the landing page
├── meetings.html            Meeting Library — 5 governance forums
├── meeting.html             Single meeting deep-dive with agent processing
├── actions.html             Governance Actions Register (Jira mirror)
├── correlation.html         Cross-Forum Correlation — the PaymentGate story
├── ask.html                 Ask the Tower — Llama-powered chat
├── deck.html                Reveal.js narrative deck for the pitch
├── assets/
│   ├── css/tower.css        Custom styles
│   └── js/tower.js          Shared UI + Alpine components
├── data/
│   ├── company.js           Northwind Technology seeded data
│   ├── meetings/*.js        5 meeting artefacts (raw minutes + processed)
│   └── llama-responses.js   Cached Q&A pairs for Ask-the-Tower
└── docs/
    ├── demo-script.md       Minute-by-minute walkthrough
    └── qna-cheatsheet.md    Executive questions with drafted answers
```

## Attribution

Demo built as an implementation companion to the Technology Management Tower design blueprint.
