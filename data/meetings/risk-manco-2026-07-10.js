/* Risk MANCO — 10 July 2026 — pre-processed meeting. */

window.MEETINGS_BY_ID = window.MEETINGS_BY_ID || {};
window.MEETINGS_BY_ID['risk-manco-2026-07-10'] = {
  id: 'risk-manco-2026-07-10',
  forum: 'Risk MANCO',
  forumShort: 'Risk',
  forumColor: 'amber',
  date: '2026-07-10',
  dateLabel: 'Fri · 10 July 2026',
  time: '09:30 – 11:00 BST',
  chair: 'Marcus Bell, CRO Delegate',
  location: 'Teams · Recorded · Transcript enabled',
  meetingType: 'Governance (monthly)',
  processedAt: '2026-07-10 11:22 BST',
  approvedBy: 'Chloe Bennett · Risk Secretariat',
  attendees: [
    { name: 'Marcus Bell',      role: 'CRO Delegate (Chair)' },
    { name: 'Sarah Whitmore',   role: 'CISO' },
    { name: 'Chloe Bennett',    role: 'Risk Secretariat' },
    { name: 'Priya Deshmukh',   role: 'Head of Third-Party Risk' },
    { name: 'Angela Rossi',     role: 'Head of Compliance' },
    { name: 'Daniel Hughes',    role: 'Head of Engineering' },
    { name: 'Elena Rivera',     role: 'Chief Architect' },
    { name: 'Tom Nakamura',     role: 'Head of Service' },
    { name: 'Rachel Martin',    role: 'Head of Data' },
    { name: 'Ahmed Khan',       role: 'FinOps Lead' },
    { name: 'Ravi Chandran',    role: 'CIO (dial-in, items 1–3)' }
  ],
  regrets: [],
  agenda: [
    'Quarterly risk register review (Bennett)',
    'Third-party concentration — new emerging risk (Deshmukh)',
    'DORA readiness dashboard (Rossi)',
    'Cloud budget variance (Khan)',
    'Key-person dependency — Data Engineering (Martin)',
    'Emerging risk horizon-scan (Bennett)'
  ],

  minuteHtml: `
    <h1>Risk MANCO — Minutes</h1>
    <p class="tt-attendee"><strong>Date:</strong> Friday, 10 July 2026, 09:30–11:00 BST · <strong>Chair:</strong> Marcus Bell (CRO Delegate)</p>
    <p class="tt-attendee"><strong>Attendees:</strong> 10 present (see register). <strong>Guest:</strong> Ravi Chandran (CIO) dialled in for items 1–3.</p>

    <h2>1 · Quarterly Risk Register Review</h2>
    <p>Chloe Bennett walked the committee through the top 15 risks and their movement since April. <span class="tt-highlight-decision">Decision: R-041 (PaymentGate SLA) uplift to Critical, escalated from Cyber MANCO 8 July, ratified by this committee for formal escalation to SteerCo.</span> No other rating changes this cycle.</p>

    <h2>2 · Third-Party Concentration — New Emerging Risk</h2>
    <p>Priya Deshmukh proposed a new risk on third-party concentration: <em>merchant payment flows (PaymentGate, £180M/yr), core cloud (single CSP for regulated workloads, ~£19M/yr), and identity (single IDP vendor)</em>. <span class="tt-highlight-risk">R-NEW-3 (Third-party concentration — payments, cloud, identity) added to register at Critical.</span> <span class="tt-highlight-action">Marcus Bell to commission a risk-treatment plan for the three concentration points by 31 July.</span></p>

    <h2>3 · DORA Readiness</h2>
    <p>Angela Rossi presented the DORA readiness dashboard — overall status 82%, down from 86% following identification of the CIF mapping ownership gap at ARB 9 July. <span class="tt-highlight-action">Angela Rossi to update the board on DORA progress at SteerCo on 14 July.</span></p>

    <h2>4 · Cloud Budget Variance</h2>
    <p>Ahmed Khan presented FY26 cloud spend: MTD £2.14M vs plan £2.02M (+6% MTD, +3.4% forecast). Breach probability now 74% for FY26. <span class="tt-highlight-risk">R-NEW-4 (FY26 cloud budget breach) added at High.</span> <span class="tt-highlight-action">Ahmed Khan to escalate cloud variance to SteerCo on 14 July with recommended controls tightening.</span></p>

    <h2>5 · Key-Person Dependency — Data Engineering</h2>
    <p>Rachel Martin noted three senior data engineers approached by competitors; retention conversation required. R-072 (Key-person data eng) remains High. <span class="tt-highlight-action">Rachel Martin to hold HR/CIO conversation on retention package by 24 July.</span></p>

    <h2>6 · Emerging Risk Horizon-Scan</h2>
    <p>Chloe Bennett confirmed quarterly emerging-risk horizon-scanning will happen at October MANCO with input from external threat intel. <span class="tt-highlight-action">Chloe Bennett to schedule emerging-risk heatmap review for October MANCO by 30 September.</span></p>

    <p><span class="tt-highlight-action">Chloe Bennett to schedule the quarterly risk appetite refresh workshop for 31 August.</span></p>

    <p class="tt-attendee" style="margin-top: 24px; font-style: italic;">Meeting closed at 10:56. Draft minutes prepared by Meeting Intelligence Agent · reviewed and approved by Chloe Bennett.</p>
  `,

  processed: {
    summary: 'Risk MANCO ratified R-041 (PaymentGate) uplift for SteerCo escalation, added R-NEW-3 (third-party concentration) at Critical, added R-NEW-4 (FY26 cloud budget breach) at High, and committed updates to SteerCo on both DORA and cloud variance. Six actions; two decisions; four risks (one uplift ratified, three new).',

    decisions: [
      { id: 'D-RSK-1', text: 'R-041 (PaymentGate SLA) uplift to Critical ratified; formal escalation to SteerCo endorsed.', ownedBy: 'Marcus Bell', citation: 'Item 1' },
      { id: 'D-RSK-2', text: 'R-NEW-3 (Third-party concentration — payments, cloud, identity) added to register at Critical.', ownedBy: 'Priya Deshmukh', citation: 'Item 2' }
    ],

    risks: [
      { id: 'R-041', type: 'existing-uplifted', title: 'Vendor SLA — PaymentGate', from: 'High', to: 'Critical', driver: 'Ratified from Cyber MANCO 8 Jul', linkedActions: [] },
      { id: 'R-NEW-3', type: 'new-candidate', title: 'Third-party concentration (payments, cloud, identity)', rating: 'Critical', driver: 'PaymentGate £180M/yr concentration, plus single-CSP and single-IDP exposure', linkedActions: ['RSK-A1'] },
      { id: 'R-NEW-4', type: 'new-candidate', title: 'FY26 cloud budget breach', rating: 'High', driver: 'MTD +6%; forecast breach probability 74%', linkedActions: ['RSK-A3'] },
      { id: 'R-NEW-5', type: 'new-candidate', title: 'FY27 investment prioritisation gap', rating: 'Medium', driver: 'Portfolio pipeline outstrips forecast envelope', linkedActions: [] }
    ],

    actions: [
      { id: 'RSK-A1', text: 'Commission risk-treatment plan for three concentration points (payments, cloud, identity)',
        ownerCandidate: 'Marcus Bell', ownerConfidence: 0.99, dueDate: '2026-07-31', dueLabel: '31 Jul',
        priority: 'Critical', priorityRationale: 'New Critical risk requires treatment within 30 days per policy',
        sourceItem: 'Item 2', sourceQuote: '"Marcus to commission risk-treatment plan by 31 July."',
        dedup: null, linkedRisk: 'R-NEW-3', confidenceGrade: 'A',
        draftJira: { key: 'RSK-201', type: 'Risk', project: 'RSK',
          summary: 'Third-party concentration — risk-treatment plan (payments, cloud, identity)', priority: 'Critical',
          labels: ['source:risk-manco','risk:R-NEW-3','concentration'] } },
      { id: 'RSK-A2', text: 'Update board on DORA progress at SteerCo 14 July',
        ownerCandidate: 'Angela Rossi', ownerConfidence: 0.98, dueDate: '2026-07-14', dueLabel: '14 Jul',
        priority: 'High', priorityRationale: 'SteerCo agenda commitment; regulatory deadline 30 Sep',
        sourceItem: 'Item 3', sourceQuote: '"Angela to update the board at SteerCo on 14 July."',
        dedup: { type: 'auto-link', ticket: 'GOV-380', title: 'SteerCo 14 Jul agenda item — DORA', reason: 'Auto-linked to SteerCo agenda ticket' },
        linkedRisk: 'R-014', confidenceGrade: 'A',
        draftJira: { key: 'RSK-202', type: 'Governance Item', project: 'RSK',
          summary: 'DORA readiness — SteerCo update 14 Jul', priority: 'High',
          labels: ['source:risk-manco','regulation:DORA','forum:steerco'] } },
      { id: 'RSK-A3', text: 'Escalate cloud variance to SteerCo with recommended controls tightening',
        ownerCandidate: 'Ahmed Khan', ownerConfidence: 0.98, dueDate: '2026-07-14', dueLabel: '14 Jul',
        priority: 'High', priorityRationale: 'SteerCo agenda commitment',
        sourceItem: 'Item 4', sourceQuote: '"Ahmed to escalate cloud variance to SteerCo on 14 July."',
        dedup: { type: 'auto-link', ticket: 'GOV-380', title: 'SteerCo 14 Jul agenda item — Finance', reason: 'Auto-linked to SteerCo agenda' },
        linkedRisk: 'R-NEW-4', confidenceGrade: 'A',
        draftJira: { key: 'FIN-141', type: 'Optimization Action', project: 'FIN',
          summary: 'Cloud FY26 variance — escalate to SteerCo + controls proposal', priority: 'High',
          labels: ['source:risk-manco','forum:steerco','finops'] } },
      { id: 'RSK-A4', text: 'HR + CIO conversation on retention package for senior data engineers',
        ownerCandidate: 'Rachel Martin', ownerConfidence: 0.96, dueDate: '2026-07-24', dueLabel: '24 Jul',
        priority: 'High', priorityRationale: 'Key-person risk; competitor approaches confirmed',
        sourceItem: 'Item 5', sourceQuote: '"Rachel to hold HR/CIO conversation on retention by 24 July."',
        dedup: null, linkedRisk: 'R-072', confidenceGrade: 'B',
        draftJira: { key: 'RSK-203', type: 'Management Action', project: 'RSK',
          summary: 'Data Engineering — retention conversation (HR + CIO)', priority: 'High',
          labels: ['source:risk-manco','key-person','risk:R-072'] } },
      { id: 'RSK-A5', text: 'Schedule quarterly risk appetite refresh workshop',
        ownerCandidate: 'Chloe Bennett', ownerConfidence: 0.97, dueDate: '2026-08-31', dueLabel: '31 Aug',
        priority: 'Medium', priorityRationale: 'Standard cadence, no immediate driver',
        sourceItem: 'Item 6', sourceQuote: '"Chloe to schedule quarterly risk appetite refresh for 31 August."',
        dedup: null, linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'RSK-204', type: 'Governance Item', project: 'RSK',
          summary: 'Risk appetite refresh workshop — schedule', priority: 'Medium',
          labels: ['source:risk-manco','governance'] } },
      { id: 'RSK-A6', text: 'Schedule emerging-risk heatmap review for October MANCO',
        ownerCandidate: 'Chloe Bennett', ownerConfidence: 0.98, dueDate: '2026-09-30', dueLabel: '30 Sep',
        priority: 'Low', priorityRationale: 'Cadence action; horizon-scanning',
        sourceItem: 'Item 6', sourceQuote: '"Chloe to schedule emerging-risk heatmap review for October MANCO."',
        dedup: null, linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'RSK-205', type: 'Governance Item', project: 'RSK',
          summary: 'Emerging-risk heatmap — October MANCO review', priority: 'Low',
          labels: ['source:risk-manco','horizon-scan'] } }
    ]
  }
};
