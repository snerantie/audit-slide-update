# VFS | Audit Remediations — Executive Slide

A visually attractive, executive-friendly rework of the VFS Audit Remediations
status slide. Designed for CIO, CEO, and senior executive audiences: headline
KPIs, charts, and short narrative callouts instead of a dense list of items.

## What's in the deck

The slide (`index.html`) is a single, self-contained HTML file that renders a
16:9 executive dashboard with:

- **Header** — VFS brand accent + subtitle ("FY26 Close-out & FY27 Outlook").
- **5 KPI cards** — Completion Rate, Total Closed, Open Items, FY26 Audits
  Delivered, FY27 Q1 Audits Planned.
- **Burndown chart** — Open vs. cumulative Closed across FY26 Q1 → FY27 Q1.
- **Donut chart** — 25 closed remediations split by Parent Audit stream.
- **Grouped bar chart** — FY26 vs FY27 Q1 (Audits, Remediations, Completed, Open).
- **4 narrative callouts** — FY26 Closed, FY26 In Progress, FY27 Programme,
  Capacity Note.

## How to view it

1. **Locally** — open `index.html` in any modern browser.
2. **GitHub Pages** — enable Pages on this repo (Settings → Pages → deploy from
   `main` branch, root folder) to publish a public link.
3. **Export to PDF** — open in a browser and use *Print → Save as PDF*,
   Landscape, no margins. The slide is sized to fit a standard 16:9 page.

## Tech notes

- Pure HTML + CSS + [Chart.js 4.4](https://www.chartjs.org/) via CDN — no build
  step, no dependencies to install.
- Brand palette anchored on Vodacom red (`#E60000`), with green (`#16A34A`) for
  positive status and blue (`#2563EB`) for informational callouts.
- Print-friendly: prints as a single landscape page.

## Data sources

Figures are transcribed from the source slide provided by the audit team:

| Metric                        | FY26 | FY27 Q1 |
| ----------------------------- | ---: | ------: |
| Audits                        |    7 |       4 |
| Remediation actions           |   18 |       7 |
| Completed                     |   18 |       7 |
| Open (carried forward)        |    0 |       0 |

Total closed remediations: **25** across 8 parent audit streams.
