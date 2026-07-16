/* Architecture MANCO (ARB) — 9 July 2026 — pre-processed meeting.
   The demo user opens this to inspect how a processed meeting looks. */

window.MEETINGS_BY_ID = window.MEETINGS_BY_ID || {};
window.MEETINGS_BY_ID['arb-2026-07-09'] = {
  id: 'arb-2026-07-09',
  forum: 'Architecture MANCO (ARB)',
  forumShort: 'ARB',
  forumColor: 'blue',
  date: '2026-07-09',
  dateLabel: 'Thu · 9 July 2026',
  time: '10:00 – 12:00 BST',
  chair: 'Elena Rivera, Chief Architect',
  location: 'Teams · Recorded · Transcript enabled',
  meetingType: 'Governance (bi-weekly)',
  processedAt: '2026-07-09 12:14 BST',
  approvedBy: 'Michael Grant · Enterprise Architect',
  attendees: [
    { name: 'Elena Rivera',    role: 'Chief Architect (Chair)' },
    { name: 'Kenji Tanaka',    role: 'Cloud & Platform Architect' },
    { name: 'Grace Okafor',    role: 'Data Architect' },
    { name: 'Robert Alvarez',  role: 'Payments Architect' },
    { name: 'Hannah Chen',     role: 'Security Architect' },
    { name: 'Daniel Hughes',   role: 'Head of Engineering' },
    { name: 'Michael Grant',   role: 'Enterprise Architect (secretariat)' },
    { name: 'Sarah Whitmore',  role: 'CISO (guest, item 6)' },
    { name: 'Priya Deshmukh',  role: 'Third-Party Risk (guest, item 6)' }
  ],
  regrets: [],
  agenda: [
    'DORA event-logging exception — Payments streaming (Rivera)',
    'Cloud Landing Zone v2 target-state approval (Tanaka)',
    'Oracle on-prem sunset roadmap (Okafor)',
    'Payments event-streaming architecture (Alvarez)',
    'MFA legacy options (referral from Cyber MANCO)',
    'DORA CIF mapping ownership (Whitmore/Deshmukh guests)'
  ],

  minuteHtml: `
    <h1>Architecture Review Board — Minutes</h1>
    <p class="tt-attendee"><strong>Date:</strong> Thursday, 9 July 2026, 10:00–12:00 BST · <strong>Chair:</strong> Elena Rivera (Chief Architect)</p>
    <p class="tt-attendee"><strong>Attendees:</strong> Rivera (chair), Tanaka, Okafor, Alvarez, Chen, Hughes, Grant (sec). <strong>Guests item 6:</strong> Whitmore (CISO), Deshmukh (TPR).</p>

    <h2>1 · DORA Event-Logging Exception</h2>
    <p>Elena Rivera presented the exception request for the Payments streaming platform, which emits 47k events/sec — exceeding the centralised logging aggregation capacity in the DORA event-logging standard. <span class="tt-highlight-decision" title="D-ARB-1">Decision: exception granted with 30 September 2026 expiry, conditional on a target-state design being presented at the September ARB.</span> A new risk was raised on the streaming architecture (see item 4). <span class="tt-highlight-risk">R-NEW-2 Payments event-streaming vendor lock-in added to register (Medium).</span></p>

    <h2>2 · Cloud Landing Zone v2</h2>
    <p>Kenji Tanaka presented the target-state Cloud Landing Zone v2 blueprint. Highlights: multi-account expansion, PrivateLink-first pattern, workload isolation for regulated data. <span class="tt-highlight-decision">Decision: approved for detailed design.</span> <span class="tt-highlight-action">Kenji Tanaka to publish the LZ v2 blueprint to Confluence by 20 July.</span></p>

    <h2>3 · Oracle On-Prem Sunset</h2>
    <p>Grace Okafor presented the phased Oracle on-prem sunset plan. Two applications remain hard-blocked (TreasuryWorks, LegacyCRM) awaiting replacement decisions. <span class="tt-highlight-decision">Decision: proceed with phase 1 (16 non-critical databases).</span> <span class="tt-highlight-action">Grace Okafor to confirm the sequence of decommissioning and publish a full dependency map by 8 August.</span></p>

    <h2>4 · Payments Event-Streaming Architecture</h2>
    <p>Robert Alvarez presented the options paper for Payments streaming architecture. Three options tabled: (A) migrate to managed Kafka on cloud, (B) event-mesh SaaS, (C) hybrid. Board wanted more depth on option (C). <span class="tt-highlight-action">Robert Alvarez to prepare the exception paper and target-state design for review at 30 July ARB.</span></p>

    <h2>5 · MFA Legacy Options (referred from Cyber MANCO)</h2>
    <p>Sarah Whitmore (guest) noted the pending MFA-to-legacy options paper (Cyber MANCO 8 July, action A-9). <span class="tt-highlight-action">ARB to receive Anita Rees's options paper by 25 July for review at 30 July session.</span></p>

    <h2>6 · DORA CIF Mapping Ownership</h2>
    <p>Sarah Whitmore raised the DORA Article 30 CIF (Critical or Important Functions) mapping — surfaced at Cyber MANCO the previous day as an ownership gap. Priya Deshmukh confirmed she will draft the mapping proposal (Cyber A-5). <span class="tt-highlight-decision">Decision: Architecture accepts ownership of the CIF mapping, subject to Priya's draft.</span> <span class="tt-highlight-action">Elena Rivera to formally close the loop on CIF-mapping ownership with Chief Architect sign-off by 25 July.</span></p>

    <p class="tt-attendee" style="margin-top: 24px; font-style: italic;">Meeting closed at 11:52. Draft minutes prepared by Meeting Intelligence Agent · reviewed by Michael Grant.</p>
  `,

  processed: {
    summary: 'ARB granted a DORA event-logging exception with 30 Sep expiry, approved Cloud LZ v2 blueprint, endorsed Oracle sunset phase 1, and accepted ownership of DORA CIF mapping — closing the loop on a gap raised at Cyber MANCO the previous day. Six actions extracted; four decisions; one new risk on streaming architecture.',

    decisions: [
      { id: 'D-ARB-1', text: 'DORA event-logging exception granted for Payments streaming — 30 September 2026 expiry.', ownedBy: 'Elena Rivera', citation: 'Item 1' },
      { id: 'D-ARB-2', text: 'Cloud Landing Zone v2 blueprint approved for detailed design.', ownedBy: 'Kenji Tanaka', citation: 'Item 2' },
      { id: 'D-ARB-3', text: 'Oracle on-prem sunset phase 1 (16 non-critical databases) approved.', ownedBy: 'Grace Okafor', citation: 'Item 3' },
      { id: 'D-ARB-4', text: 'Architecture accepts ownership of DORA Article 30 CIF mapping.', ownedBy: 'Elena Rivera', citation: 'Item 6' }
    ],

    risks: [
      { id: 'R-NEW-2', type: 'new-candidate', title: 'Payments event-streaming architecture vendor lock-in', rating: 'Medium', driver: 'Volume 47k events/sec exceeds centralised aggregation; exception granted with expiry', linkedActions: ['ARB-A4'] }
    ],

    actions: [
      { id: 'ARB-A1', text: 'Publish Cloud Landing Zone v2 blueprint to Confluence',
        ownerCandidate: 'Kenji Tanaka', ownerConfidence: 0.99, dueDate: '2026-07-20', dueLabel: '20 Jul',
        priority: 'Medium', priorityRationale: 'Feeds detailed design phase; not on critical path',
        sourceItem: 'Item 2', sourceQuote: '"Kenji to publish the LZ v2 blueprint by 20 July."',
        dedup: null, linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'EAG-121', type: 'Governance Item', project: 'EAG',
          summary: 'Cloud LZ v2 — publish blueprint to Confluence', priority: 'Medium',
          labels: ['source:arb','cloud','lz-v2'] } },
      { id: 'ARB-A2', text: 'Confirm sequence of Oracle decommissioning and publish dependency map',
        ownerCandidate: 'Grace Okafor', ownerConfidence: 0.98, dueDate: '2026-08-08', dueLabel: '8 Aug',
        priority: 'Medium', priorityRationale: 'Feeds phase 2 sequencing',
        sourceItem: 'Item 3', sourceQuote: '"Grace to confirm sequence and publish dependency map by 8 August."',
        dedup: null, linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'EAG-122', type: 'Governance Item', project: 'EAG',
          summary: 'Oracle sunset — decommissioning sequence + dependency map', priority: 'Medium',
          labels: ['source:arb','oracle','sunset'] } },
      { id: 'ARB-A3', text: 'Prepare Payments event-streaming exception paper and target-state design for 30 Jul ARB',
        ownerCandidate: 'Robert Alvarez', ownerConfidence: 0.98, dueDate: '2026-07-30', dueLabel: '30 Jul',
        priority: 'High', priorityRationale: 'Regulatory expiry 30 Sep; must be ratified in September ARB',
        sourceItem: 'Item 4', sourceQuote: '"Robert to prepare exception paper for 30 July ARB."',
        dedup: null, linkedRisk: 'R-NEW-2', confidenceGrade: 'A',
        draftJira: { key: 'EAG-123', type: 'Architecture Exception', project: 'EAG',
          summary: 'Payments event-streaming — exception paper + target-state design', priority: 'High',
          labels: ['source:arb','regulation:DORA','risk:R-NEW-2'] } },
      { id: 'ARB-A4', text: 'Approve DORA event-logging exception with 30 Sep expiry (formal minute)',
        ownerCandidate: 'Elena Rivera', ownerConfidence: 0.99, dueDate: '2026-07-09', dueLabel: '9 Jul (today)',
        priority: 'High', priorityRationale: 'In-meeting decision to be formally recorded',
        sourceItem: 'Item 1', sourceQuote: '"Decision: exception granted with 30 September 2026 expiry."',
        dedup: null, linkedRisk: 'R-014', confidenceGrade: 'A',
        draftJira: { key: 'EAG-124', type: 'Architecture Exception', project: 'EAG',
          summary: 'DORA event-logging exception — formal minute + 30 Sep expiry', priority: 'High',
          labels: ['source:arb','regulation:DORA','exception'] } },
      { id: 'ARB-A5', text: 'Receive MFA legacy options paper from Cyber MANCO (A-9) and add to 30 Jul agenda',
        ownerCandidate: 'Elena Rivera', ownerConfidence: 0.94, dueDate: '2026-07-30', dueLabel: '30 Jul',
        priority: 'Low', priorityRationale: 'Coordination action, no delivery blocker',
        sourceItem: 'Item 5', sourceQuote: '"ARB to receive by 25 July for review at 30 July session."',
        dedup: { type: 'related', ticket: 'GOV-387', title: 'MFA legacy options paper (Cyber MANCO A-9)', reason: 'Related to upstream Cyber action' },
        linkedRisk: null, confidenceGrade: 'A',
        draftJira: { key: 'EAG-125', type: 'Governance Item', project: 'EAG',
          summary: 'MFA legacy options — receive paper and agenda for 30 Jul ARB', priority: 'Low',
          labels: ['source:arb','identity','cross-forum:cyber-manco'] } },
      { id: 'ARB-A6', text: 'Close loop on DORA CIF-mapping ownership with Chief Architect sign-off',
        ownerCandidate: 'Elena Rivera', ownerConfidence: 0.97, dueDate: '2026-07-25', dueLabel: '25 Jul',
        priority: 'High', priorityRationale: 'Regulatory deadline 30 Sep; unblocks Priya\\'s draft',
        sourceItem: 'Item 6', sourceQuote: '"Elena to close the loop on CIF-mapping ownership by 25 July."',
        dedup: { type: 'related', ticket: 'GOV-382', title: 'DORA CIF mapping — raise ownership at ARB (Cyber A-4)', reason: 'Downstream of Cyber MANCO A-4' },
        linkedRisk: 'R-014', confidenceGrade: 'A',
        draftJira: { key: 'EAG-126', type: 'Governance Item', project: 'EAG',
          summary: 'DORA CIF mapping — Chief Architect sign-off', priority: 'High',
          labels: ['source:arb','regulation:DORA','cross-forum:cyber-manco'] } }
    ]
  }
};
