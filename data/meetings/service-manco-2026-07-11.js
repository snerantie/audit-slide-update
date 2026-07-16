/* Service Management MANCO — 11 July 2026 — pre-processed meeting. */

window.MEETINGS_BY_ID = window.MEETINGS_BY_ID || {};
window.MEETINGS_BY_ID['service-manco-2026-07-11'] = {
  id: 'service-manco-2026-07-11',
  forum: 'Service Management MANCO',
  forumShort: 'Service',
  forumColor: 'amber',
  date: '2026-07-11',
  dateLabel: 'Sat · 11 July 2026',
  time: '11:00 – 12:00 BST',
  chair: 'Tom Nakamura, Head of Service',
  location: 'Teams · Recorded · Transcript enabled',
  meetingType: 'Operational (weekly)',
  processedAt: '2026-07-11 12:18 BST',
  approvedBy: 'Adam Wells · Head of Operations',
  attendees: [
    { name: 'Tom Nakamura',   role: 'Head of Service (Chair)' },
    { name: 'Vikram Patel',   role: 'Payments Service Owner' },
    { name: 'Emma Foster',    role: 'Contact Centre Service Owner' },
    { name: 'Rachel Martin',  role: 'Data Service Owner' },
    { name: 'Chris Bergman',  role: 'Wealth Service Owner' },
    { name: 'Adam Wells',     role: 'Head of Operations' },
    { name: 'Linda Park',     role: 'CAB Chair' },
    { name: 'Julian Cross',   role: 'Head of Merchant Services' }
  ],
  regrets: [],
  agenda: [
    'July P1 review (Nakamura)',
    'SIP progress — Contact Centre, Payments (Foster/Patel)',
    'CAB pipeline for week of 14 July (Park)',
    'Customer sentiment & complaints (Wells)',
    'Merchant availability SLA breach (Cross)'
  ],

  minuteHtml: `
    <h1>Service Management MANCO — Minutes</h1>
    <p class="tt-attendee"><strong>Date:</strong> Saturday, 11 July 2026, 11:00–12:00 BST · <strong>Chair:</strong> Tom Nakamura (Head of Service)</p>
    <p class="tt-attendee"><strong>Attendees:</strong> Nakamura (chair), Patel, Foster, Martin, Bergman, Wells, Park, Cross.</p>

    <h2>1 · July P1 Review</h2>
    <p>Two P1 incidents in the last ten days. <strong>3 July:</strong> PaymentGate certificate rotation failure — 47 min customer impact, £420k delayed settlements. <strong>7 July:</strong> PaymentGate API gateway 5xx spike — 22 min impact. <em>Both root cause vendor-side reliability.</em> <span class="tt-highlight-decision">Decision: publish combined July P1 report identifying PaymentGate as the common root cause and feed into SteerCo escalation.</span> <span class="tt-highlight-action">Tom Nakamura to publish combined July P1 report by 18 July.</span></p>

    <h2>2 · SIP Progress</h2>
    <p>Emma Foster: Contact Centre reliability SIP — 12% improvement MoM, on target. <span class="tt-highlight-action">Emma Foster to provide next SIP update at MANCO on 15 August.</span> Vikram Patel: Payments SIP — on target, but proposed acceleration in light of PaymentGate exposure. <span class="tt-highlight-decision">Decision: accelerate Payments SIP timeline; revised plan required.</span> <span class="tt-highlight-action">Vikram Patel to propose accelerated Payments SIP plan by 22 July.</span></p>

    <h2>3 · CAB Pipeline</h2>
    <p>Linda Park: 12 changes proposed for week of 14 July; two flagged high-risk — identity provider migration and TreasuryWorks database cutover. <span class="tt-highlight-action">Linda Park to review high-risk changes with owners and provide risk assessment by 13 July.</span></p>

    <h2>4 · Customer Sentiment & Complaints</h2>
    <p>Adam Wells: NPS static; complaint volume up 8% linked to July outages. No action required.</p>

    <h2>5 · Merchant Availability SLA Breach</h2>
    <p>Julian Cross: Merchant availability July MTD 99.87% vs 99.95% target — first SLA breach in 14 months. <span class="tt-highlight-risk">R-NEW-7 (Merchant availability SLA) added at Medium.</span> <span class="tt-highlight-action">Julian Cross to conduct post-mortem and issue formal report to affected merchants by 20 July.</span></p>

    <p class="tt-attendee" style="margin-top: 24px; font-style: italic;">Meeting closed at 11:56. Draft minutes prepared by Meeting Intelligence Agent · reviewed by Adam Wells.</p>
  `,

  processed: {
    summary: 'Two July P1 incidents both traced to PaymentGate vendor-side reliability — cross-forum theme confirmed with Cyber MANCO. Payments SIP acceleration approved, merchant availability SLA breach recorded as new Medium risk. Five actions; two decisions; one new risk.',

    decisions: [
      { id: 'D-SVC-1', text: 'Publish combined July P1 report identifying PaymentGate as the common root cause; feed into SteerCo escalation.', ownedBy: 'Tom Nakamura', citation: 'Item 1' },
      { id: 'D-SVC-2', text: 'Accelerate Payments SIP timeline; revised plan required by 22 July.', ownedBy: 'Vikram Patel', citation: 'Item 2' }
    ],

    risks: [
      { id: 'R-NEW-7', type: 'new-candidate', title: 'Merchant availability SLA breach', rating: 'Medium', driver: 'July MTD 99.87% vs 99.95% target; first breach in 14 months', linkedActions: ['SVC-A5'] }
    ],

    actions: [
      { id: 'SVC-A1', text: 'Publish combined July P1 report identifying PaymentGate root cause',
        ownerCandidate: 'Tom Nakamura', ownerConfidence: 0.99, dueDate: '2026-07-18', dueLabel: '18 Jul',
        priority: 'High', priorityRationale: 'Feeds SteerCo escalation of R-041; regulatory-adjacent',
        sourceItem: 'Item 1', sourceQuote: '"Tom to publish combined July P1 report by 18 July."',
        dedup: { type: 'related', ticket: 'GOV-379', title: 'PaymentGate 3 Jul P1 — post-incident report (Cyber A-2)', reason: 'Feeds into Cyber-owned incident report' },
        linkedRisk: 'R-041', confidenceGrade: 'A',
        draftJira: { key: 'SIP-311', type: 'Service Improvement', project: 'SIP',
          summary: 'July P1 report — combined PaymentGate root-cause', priority: 'High',
          labels: ['source:service-manco','vendor:paymentgate','cross-forum:cyber-manco','risk:R-041'] } },
      { id: 'SVC-A2', text: 'Contact Centre SIP — next progress update at 15 Aug MANCO',
        ownerCandidate: 'Emma Foster', ownerConfidence: 0.98, dueDate: '2026-08-15', dueLabel: '15 Aug',
        priority: 'Medium', priorityRationale: 'Cadence action; SIP on target',
        sourceItem: 'Item 2', sourceQuote: '"Emma to provide next SIP update at MANCO on 15 August."',
        dedup: null, linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'SIP-312', type: 'Service Improvement', project: 'SIP',
          summary: 'Contact Centre SIP — update at 15 Aug MANCO', priority: 'Medium',
          labels: ['source:service-manco','contact-centre','sip'] } },
      { id: 'SVC-A3', text: 'Propose accelerated Payments SIP plan',
        ownerCandidate: 'Vikram Patel', ownerConfidence: 0.98, dueDate: '2026-07-22', dueLabel: '22 Jul',
        priority: 'High', priorityRationale: 'PaymentGate exposure demands accelerated response',
        sourceItem: 'Item 2', sourceQuote: '"Vikram to propose accelerated Payments SIP plan by 22 July."',
        dedup: null, linkedRisk: 'R-041', confidenceGrade: 'A',
        draftJira: { key: 'SIP-313', type: 'Service Improvement', project: 'SIP',
          summary: 'Payments SIP — accelerated plan proposal', priority: 'High',
          labels: ['source:service-manco','payments','sip','risk:R-041'] } },
      { id: 'SVC-A4', text: 'Review high-risk changes for week of 14 July',
        ownerCandidate: 'Linda Park', ownerConfidence: 0.99, dueDate: '2026-07-13', dueLabel: '13 Jul',
        priority: 'Medium', priorityRationale: 'CAB gate before week begins',
        sourceItem: 'Item 3', sourceQuote: '"Linda to review high-risk changes and provide risk assessment by 13 July."',
        dedup: null, linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'SIP-314', type: 'Service Improvement', project: 'SIP',
          summary: 'CAB week of 14 Jul — high-risk change review', priority: 'Medium',
          labels: ['source:service-manco','cab','change'] } },
      { id: 'SVC-A5', text: 'Merchant availability SLA — post-mortem + formal report to affected merchants',
        ownerCandidate: 'Julian Cross', ownerConfidence: 0.99, dueDate: '2026-07-20', dueLabel: '20 Jul',
        priority: 'High', priorityRationale: 'Contractual reporting obligation; reputational',
        sourceItem: 'Item 5', sourceQuote: '"Julian to conduct post-mortem and issue formal report to affected merchants by 20 July."',
        dedup: null, linkedRisk: 'R-NEW-7', confidenceGrade: 'A',
        draftJira: { key: 'SIP-315', type: 'Service Improvement', project: 'SIP',
          summary: 'Merchant availability SLA — post-mortem + merchant reporting', priority: 'High',
          labels: ['source:service-manco','merchant','sla','risk:R-NEW-7'] } }
    ]
  }
};
