/* SteerCo — 14 July 2026 — the culmination meeting.
   References every other forum from the previous 6 days. */

window.MEETINGS_BY_ID = window.MEETINGS_BY_ID || {};
window.MEETINGS_BY_ID['steerco-2026-07-14'] = {
  id: 'steerco-2026-07-14',
  forum: 'SteerCo (Strategic Steering Committee)',
  forumShort: 'SteerCo',
  forumColor: 'red',
  date: '2026-07-14',
  dateLabel: 'Tue · 14 July 2026',
  time: '15:00 – 17:00 BST',
  chair: 'Ravi Chandran, CIO',
  location: 'Boardroom + Teams · Recorded · Transcript enabled',
  meetingType: 'Governance (monthly)',
  processedAt: '2026-07-14 17:34 BST',
  approvedBy: 'Chloe Bennett · Governance Secretariat',
  attendees: [
    { name: 'Ravi Chandran',    role: 'CIO (Chair)' },
    { name: 'Fiona Delacroix',  role: 'CFO — Technology' },
    { name: 'Marcus Bell',      role: 'CRO Delegate' },
    { name: 'Olivia Thornton',  role: 'COO' },
    { name: 'Vikram Patel',     role: 'Head of Payments' },
    { name: 'Rachel Martin',    role: 'Head of Data' },
    { name: 'Chris Bergman',    role: 'Head of Wealth' },
    { name: 'Elena Rivera',     role: 'CTO / Chief Architect' },
    { name: 'Sarah Whitmore',   role: 'CISO' },
    { name: 'Tom Nakamura',     role: 'Head of Service' },
    { name: 'Ahmed Khan',       role: 'FinOps Lead' },
    { name: 'Priya Kapoor',     role: 'PMO Director' }
  ],
  regrets: [],
  agenda: [
    'Payments Modernisation quarterly review (Patel)',
    'PaymentGate escalation from Cyber MANCO (Whitmore)',
    'DORA programme readiness (Rossi via papers)',
    'Cloud FY26 budget variance (Khan)',
    'Data Platform Go-Live gates (Martin)',
    'Wealth Digital Go-Live status (Bergman)',
    'FY27 investment portfolio — early view (Kapoor)'
  ],

  minuteHtml: `
    <h1>SteerCo — Strategic Steering Committee — Minutes</h1>
    <p class="tt-attendee"><strong>Date:</strong> Tuesday, 14 July 2026, 15:00–17:00 BST · <strong>Chair:</strong> Ravi Chandran (CIO)</p>
    <p class="tt-attendee"><strong>Attendees:</strong> 12 present (see register). <strong>Quorum met.</strong></p>

    <h2>1 · Payments Modernisation Quarterly Review</h2>
    <p>Vikram Patel presented Q3 delivery. Programme has slipped 3 weeks against baseline; £2.1M over budget; and vendor concentration on PaymentGate now recognised as material. RAG moved from Amber to <strong style="color:#B91C1C">RED</strong>. <span class="tt-highlight-decision">Decision: Payments Modernisation → RED; recovery plan mandated within 10 working days.</span> <span class="tt-highlight-action">Vikram Patel to submit Payments Modernisation recovery plan by 25 July.</span></p>

    <h2>2 · PaymentGate Escalation from Cyber MANCO</h2>
    <p>Sarah Whitmore presented R-041 uplift, ratified at Risk MANCO 10 July. Fourth SLA breach in six months, two July P1 incidents (Service MANCO 11 July), £180M/yr merchant flow concentration. <span class="tt-highlight-decision">Decision: R-041 uplift to Critical confirmed; contract exit-clause preparation authorised via Procurement and Legal.</span> <span class="tt-highlight-action">Ravi Chandran and Legal to progress formal contract review and prepare exit-clause invocation by 21 July.</span> <span class="tt-highlight-action">Marcus Bell to receive third-party concentration risk-treatment plan (from Risk MANCO) by 31 July.</span></p>

    <h2>3 · DORA Programme Readiness</h2>
    <p>Angela Rossi's paper tabled — overall DORA readiness 82%, slipped from 86% after CIF-mapping ownership gap identified at ARB 9 July. Q3 uplift plan (£1.2M funding request) proposed. <span class="tt-highlight-decision">Decision: DORA Q3 uplift funding of £1.2M approved.</span> <span class="tt-highlight-action">Fiona Delacroix to release DORA Q3 uplift funding and confirm to Finance by 21 July.</span></p>

    <h2>4 · Cloud FY26 Budget Variance</h2>
    <p>Ahmed Khan presented FY26 variance of +3.4% forecast and breach probability of 74% (Risk MANCO 10 July). <span class="tt-highlight-decision">Decision: FY26 cloud variance accepted; FY27 planning to include tighter controls (commit strategy, non-prod scheduling, unit economics reporting).</span> <span class="tt-highlight-action">Ahmed Khan to publish FY27 cloud controls proposal for approval at August SteerCo by 31 July.</span></p>

    <h2>5 · Data Platform Go-Live Gates</h2>
    <p>Rachel Martin presented gate 6 (integration) and gate 7 (business acceptance) status. Both proposed for conditional sign-off; final gate 8 (operational readiness) at end-July. <span class="tt-highlight-decision">Decision: Data Platform gates 6 and 7 conditionally signed off.</span> <span class="tt-highlight-action">Rachel Martin to close gate 8 (operational readiness) with final sign-off by 25 July.</span></p>

    <h2>6 · Wealth Digital Go-Live</h2>
    <p>Chris Bergman presented Wealth Digital readiness. Cyber sign-off received conditional on pen-test Medium remediation by 30 July (Cyber MANCO 8 July, decision D-2). <span class="tt-highlight-action">Chris Bergman to confirm Wealth Digital Go-Live readiness pending pen-test Medium remediation by 30 July.</span></p>

    <h2>7 · FY27 Investment Portfolio — Early View</h2>
    <p>Priya Kapoor presented the FY27 pipeline. Approximately £280M of proposed investment against a £220M envelope; prioritisation required. <span class="tt-highlight-action">Priya Kapoor to co-ordinate heads-of-function draft business cases and portfolio prioritisation by 15 August.</span></p>

    <p><span class="tt-highlight-action">Chloe Bennett to circulate final approved minutes and confirm all action tickets in Jira by 16 July.</span></p>

    <p class="tt-attendee" style="margin-top: 24px; font-style: italic;">Meeting closed at 16:58. Draft minutes prepared by Meeting Intelligence Agent · reviewed by Chloe Bennett · approved for circulation by Ravi Chandran.</p>
  `,

  processed: {
    summary: 'SteerCo received escalations from Cyber MANCO (R-041 uplift), Risk MANCO (third-party concentration), Service MANCO (July P1s), and ARB (DORA exception). Payments Modernisation moved to RED with recovery plan mandated; £1.2M DORA Q3 uplift approved; PaymentGate exit-clause preparation authorised. Eight actions; five decisions; three formally recorded risks.',

    decisions: [
      { id: 'D-STE-1', text: 'Payments Modernisation programme moved to RED; recovery plan mandated within 10 working days.', ownedBy: 'Vikram Patel', citation: 'Item 1' },
      { id: 'D-STE-2', text: 'R-041 uplift to Critical confirmed; PaymentGate contract exit-clause preparation authorised.', ownedBy: 'Ravi Chandran / Legal', citation: 'Item 2' },
      { id: 'D-STE-3', text: 'DORA Q3 uplift funding of £1.2M approved.', ownedBy: 'Fiona Delacroix', citation: 'Item 3' },
      { id: 'D-STE-4', text: 'FY26 cloud variance accepted; FY27 planning to include tighter controls.', ownedBy: 'Ahmed Khan', citation: 'Item 4' },
      { id: 'D-STE-5', text: 'Data Platform gates 6 and 7 conditionally signed off.', ownedBy: 'Rachel Martin', citation: 'Item 5' }
    ],

    risks: [
      { id: 'R-041', type: 'existing-uplifted', title: 'Vendor SLA — PaymentGate', from: 'High', to: 'Critical', driver: 'SteerCo confirmation of uplift; exit-clause preparation authorised', linkedActions: ['STE-A1'] },
      { id: 'R-014', type: 'existing-uplifted', title: 'Regulatory — DORA readiness', from: 'High', to: 'High', driver: '82% readiness; funding approved for uplift', linkedActions: ['STE-A3'] },
      { id: 'R-063', type: 'existing-uplifted', title: 'Cloud budget variance FY26', from: 'Medium', to: 'High', driver: 'Breach probability 74%; SteerCo accepted variance', linkedActions: ['STE-A4'] }
    ],

    actions: [
      { id: 'STE-A1', text: 'Progress formal PaymentGate contract review and prepare exit-clause invocation',
        ownerCandidate: 'Ravi Chandran', ownerConfidence: 0.98, dueDate: '2026-07-21', dueLabel: '21 Jul',
        priority: 'Critical', priorityRationale: 'CIO-owned decision from SteerCo; regulatory/reputational',
        sourceItem: 'Item 2', sourceQuote: '"Ravi and Legal to progress formal contract review and prepare exit-clause invocation by 21 July."',
        dedup: { type: 'related', ticket: 'GOV-378', title: 'PaymentGate — raise contract exit clause (Cyber A-1)', reason: 'Upstream Cyber MANCO action A-1 — this SteerCo action supersedes it' },
        linkedRisk: 'R-041', confidenceGrade: 'A',
        draftJira: { key: 'GOV-401', type: 'Management Action', project: 'GOV',
          summary: 'PaymentGate — CIO-led contract review + exit-clause preparation', priority: 'Critical',
          labels: ['source:steerco','vendor:paymentgate','risk:R-041','cross-forum:cyber-manco','cross-forum:risk-manco'] } },
      { id: 'STE-A2', text: 'Submit Payments Modernisation recovery plan',
        ownerCandidate: 'Vikram Patel', ownerConfidence: 0.99, dueDate: '2026-07-25', dueLabel: '25 Jul',
        priority: 'Critical', priorityRationale: 'RAG RED; SteerCo-mandated within 10 working days',
        sourceItem: 'Item 1', sourceQuote: '"Vikram to submit Payments Modernisation recovery plan by 25 July."',
        dedup: null, linkedRisk: 'R-041', confidenceGrade: 'A',
        draftJira: { key: 'GOV-402', type: 'Management Action', project: 'GOV',
          summary: 'Payments Modernisation — recovery plan (RAG RED)', priority: 'Critical',
          labels: ['source:steerco','programme:payments','risk:R-041'] } },
      { id: 'STE-A3', text: 'Release DORA Q3 uplift funding (£1.2M) and confirm to Finance',
        ownerCandidate: 'Fiona Delacroix', ownerConfidence: 0.98, dueDate: '2026-07-21', dueLabel: '21 Jul',
        priority: 'High', priorityRationale: 'Funding released; regulatory deadline 30 Sep',
        sourceItem: 'Item 3', sourceQuote: '"Fiona to release DORA Q3 uplift funding and confirm to Finance by 21 July."',
        dedup: null, linkedRisk: 'R-014', confidenceGrade: 'A',
        draftJira: { key: 'GOV-403', type: 'Management Action', project: 'GOV',
          summary: 'DORA Q3 uplift — release funding (£1.2M)', priority: 'High',
          labels: ['source:steerco','regulation:DORA','risk:R-014','cross-forum:risk-manco'] } },
      { id: 'STE-A4', text: 'Publish FY27 cloud controls proposal for August SteerCo approval',
        ownerCandidate: 'Ahmed Khan', ownerConfidence: 0.98, dueDate: '2026-07-31', dueLabel: '31 Jul',
        priority: 'High', priorityRationale: 'FY27 planning window',
        sourceItem: 'Item 4', sourceQuote: '"Ahmed to publish FY27 cloud controls proposal by 31 July."',
        dedup: null, linkedRisk: 'R-063', confidenceGrade: 'A',
        draftJira: { key: 'FIN-142', type: 'Optimization Action', project: 'FIN',
          summary: 'FY27 cloud controls — proposal for August SteerCo', priority: 'High',
          labels: ['source:steerco','finops','fy27'] } },
      { id: 'STE-A5', text: 'Data Platform gate 8 (operational readiness) — final sign-off',
        ownerCandidate: 'Rachel Martin', ownerConfidence: 0.99, dueDate: '2026-07-25', dueLabel: '25 Jul',
        priority: 'Medium', priorityRationale: 'Programme milestone',
        sourceItem: 'Item 5', sourceQuote: '"Rachel to close gate 8 with final sign-off by 25 July."',
        dedup: null, linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'GOV-404', type: 'Management Action', project: 'GOV',
          summary: 'Data Platform — gate 8 operational readiness sign-off', priority: 'Medium',
          labels: ['source:steerco','programme:data-platform'] } },
      { id: 'STE-A6', text: 'Confirm Wealth Digital Go-Live pending pen-test Medium remediation',
        ownerCandidate: 'Chris Bergman', ownerConfidence: 0.98, dueDate: '2026-07-30', dueLabel: '30 Jul',
        priority: 'Medium', priorityRationale: 'Go-Live window; contingent on remediation',
        sourceItem: 'Item 6', sourceQuote: '"Chris to confirm Wealth Digital Go-Live readiness pending remediation by 30 July."',
        dedup: { type: 'related', ticket: 'GOV-386', title: 'Wealth Digital pen test — Internal Audit (Cyber A-8)', reason: 'Upstream Cyber-owned evidence action' },
        linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'GOV-405', type: 'Management Action', project: 'GOV',
          summary: 'Wealth Digital Go-Live — confirm pending pen-test Medium remediation', priority: 'Medium',
          labels: ['source:steerco','wealth-digital','cross-forum:cyber-manco'] } },
      { id: 'STE-A7', text: 'Co-ordinate FY27 heads-of-function business cases and portfolio prioritisation',
        ownerCandidate: 'Priya Kapoor', ownerConfidence: 0.99, dueDate: '2026-08-15', dueLabel: '15 Aug',
        priority: 'High', priorityRationale: 'FY27 planning window',
        sourceItem: 'Item 7', sourceQuote: '"Priya to co-ordinate heads-of-function draft business cases by 15 August."',
        dedup: null, linkedRisk: 'R-NEW-5', confidenceGrade: 'A',
        draftJira: { key: 'PMO-501', type: 'Governance Item', project: 'PMO',
          summary: 'FY27 portfolio — draft business cases + prioritisation', priority: 'High',
          labels: ['source:steerco','fy27','portfolio'] } },
      { id: 'STE-A8', text: 'Circulate final approved SteerCo minutes and confirm all action tickets in Jira',
        ownerCandidate: 'Chloe Bennett', ownerConfidence: 0.99, dueDate: '2026-07-16', dueLabel: '16 Jul',
        priority: 'Medium', priorityRationale: 'Governance secretariat close-out',
        sourceItem: 'Item 7', sourceQuote: '"Chloe to circulate final approved minutes and confirm all action tickets by 16 July."',
        dedup: null, linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'GOV-406', type: 'Governance Item', project: 'GOV',
          summary: 'SteerCo 14 Jul — circulate minutes + confirm actions in Jira', priority: 'Medium',
          labels: ['source:steerco','secretariat','governance'] } }
    ]
  }
};
