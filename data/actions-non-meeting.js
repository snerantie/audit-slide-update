/* Actions sourced from non-meeting channels — email, Teams chats, SharePoint.
   Demonstrates the Tower's ability to log tickets from ALL sources of information,
   not just governance forums. Plus a small legacy backlog for realistic aging. */

window.NON_MEETING_ACTIONS = [
  /* ============ SOURCED FROM EMAILS ============ */
  {
    id: 'EMAIL-1',
    text: 'Provide urgent view on third-party concentration risk to CRO',
    ownerCandidate: 'Marcus Bell',
    ownerConfidence: 0.94,
    dueDate: '2026-07-17', dueLabel: '17 Jul',
    priority: 'Critical',
    priorityRationale: 'CRO-requested, board-facing timeline',
    sourceType: 'Email',
    sourceForum: 'Email',
    sourceForumColor: 'grey',
    sourceRef: 'Msg-Id: <20260712.0934@northwind.example>',
    sourceCitation: 'Email · Fiona Delacroix → Ravi Chandran, Marcus Bell · 12 Jul 09:34 · "Third-party concentration risk — need urgent view"',
    linkedRisk: 'R-NEW-3',
    confidenceGrade: 'B',
    draftJira: {
      key: 'GOV-390',
      type: 'Management Action', project: 'GOV',
      summary: 'Third-party concentration — urgent view for CRO',
      priority: 'Critical',
      labels: ['source:email','risk:R-NEW-3','concentration']
    }
  },
  {
    id: 'EMAIL-2',
    text: 'Align FY27 cloud controls proposal with FinOps before August SteerCo',
    ownerCandidate: 'Ahmed Khan',
    ownerConfidence: 0.98,
    dueDate: '2026-07-20', dueLabel: '20 Jul (today)',
    priority: 'High',
    priorityRationale: 'FY27 planning window; SteerCo dependency',
    sourceType: 'Email',
    sourceForum: 'Email',
    sourceForumColor: 'grey',
    sourceRef: 'Msg-Id: <20260714.1721@northwind.example>',
    sourceCitation: 'Email · Fiona Delacroix → Ahmed Khan, Ravi Chandran · 14 Jul 17:21 · "FY27 cloud controls — please align with FinOps before SteerCo"',
    linkedRisk: 'R-063',
    confidenceGrade: 'A',
    draftJira: {
      key: 'FIN-143',
      type: 'Optimization Action', project: 'FIN',
      summary: 'FY27 cloud controls — align with FinOps for August SteerCo',
      priority: 'High',
      labels: ['source:email','finops','fy27']
    }
  },
  {
    id: 'EMAIL-3',
    text: 'Schedule CPS 234 evidence-pack scoping call with external auditor',
    ownerCandidate: 'Fiona Delacroix',
    ownerConfidence: 0.92,
    dueDate: '2026-07-22', dueLabel: '22 Jul',
    priority: 'Medium',
    priorityRationale: 'Audit window opens August',
    sourceType: 'Email',
    sourceForum: 'Email',
    sourceForumColor: 'grey',
    sourceRef: 'Msg-Id: <20260715.1104@auditor.example>',
    sourceCitation: 'Email · Angela Rossi (external audit) → Fiona Delacroix · 15 Jul 11:04 · "CPS 234 — scoping call proposal"',
    linkedRisk: null,
    confidenceGrade: 'A',
    draftJira: {
      key: 'AUD-202',
      type: 'Audit Finding', project: 'AUD',
      summary: 'CPS 234 evidence-pack scoping call — external auditor',
      priority: 'Medium',
      labels: ['source:email','regulation:CPS234','audit']
    }
  },

  /* ============ SOURCED FROM TEAMS CHATS ============ */
  {
    id: 'TEAMS-1',
    text: 'Prepare board-ready AI + DORA readiness view for Q3 review',
    ownerCandidate: 'Priya Kapoor',
    ownerConfidence: 0.93,
    dueDate: '2026-07-18', dueLabel: '18 Jul',
    priority: 'High',
    priorityRationale: 'Board Q3 review · CIO-requested',
    sourceType: 'Teams',
    sourceForum: 'Teams',
    sourceForumColor: 'blue',
    sourceRef: 'Chat: #cio-cabinet · thread 202607131622',
    sourceCitation: 'Teams · #cio-cabinet · Ravi Chandran · 13 Jul 16:22 · "Board is asking for our AI + DORA readiness view — Priya can you own?"',
    linkedRisk: 'R-014',
    confidenceGrade: 'B',
    draftJira: {
      key: 'GOV-391',
      type: 'Management Action', project: 'GOV',
      summary: 'Board Q3 — AI + DORA readiness view',
      priority: 'High',
      labels: ['source:teams','regulation:DORA','board']
    }
  },
  {
    id: 'TEAMS-2',
    text: 'Publish daily war-room summary during PaymentGate exit-clause preparation',
    ownerCandidate: 'Vikram Patel',
    ownerConfidence: 0.90,
    dueDate: '2026-07-15', dueLabel: '15 Jul',
    priority: 'Medium',
    priorityRationale: 'Operational cadence during vendor crisis',
    sourceType: 'Teams',
    sourceForum: 'Teams',
    sourceForumColor: 'blue',
    sourceRef: 'Chat: #payments-warroom · thread 202607121043',
    sourceCitation: 'Teams · #payments-warroom · Vikram Patel · 12 Jul 10:43 · "Standing up daily 09:30 stand-up until R-041 downgraded"',
    linkedRisk: 'R-041',
    confidenceGrade: 'B',
    draftJira: {
      key: 'GOV-392',
      type: 'Management Action', project: 'GOV',
      summary: 'PaymentGate war-room — daily standup + summary until R-041 downgraded',
      priority: 'Medium',
      labels: ['source:teams','vendor:paymentgate','risk:R-041']
    }
  },

  /* ============ SOURCED FROM SHAREPOINT DOCS ============ */
  {
    id: 'SP-1',
    text: 'Review DORA regulatory update briefing note from external counsel',
    ownerCandidate: 'Angela Rossi',
    ownerConfidence: 0.94,
    dueDate: '2026-07-25', dueLabel: '25 Jul',
    priority: 'High',
    priorityRationale: 'External counsel guidance; regulatory deadline 30 Sep',
    sourceType: 'SharePoint',
    sourceForum: 'SharePoint',
    sourceForumColor: 'teal',
    sourceRef: '/sites/audit/regulatory-updates/DORA-July-2026.pdf',
    sourceCitation: 'SharePoint · /sites/audit/regulatory-updates/ · DORA-July-2026-Update.pdf · uploaded 11 Jul by external counsel',
    linkedRisk: 'R-014',
    confidenceGrade: 'A',
    draftJira: {
      key: 'AUD-201',
      type: 'Audit Finding', project: 'AUD',
      summary: 'DORA July 2026 regulatory update — review + gap analysis',
      priority: 'High',
      labels: ['source:sharepoint','regulation:DORA','external-counsel']
    }
  },

  /* ============ LEGACY BACKLOG (aging tickets from prior forums) ============ */
  {
    id: 'LEG-1',
    text: 'PaymentGate — scoped contract review (April 2026 Cyber MANCO)',
    ownerCandidate: 'Priya Deshmukh',
    ownerConfidence: 1.0,
    dueDate: '2026-05-06', dueLabel: '6 May (75 days overdue)',
    priority: 'Medium',
    priorityRationale: 'Legacy carry-over',
    sourceType: 'Meeting',
    sourceForum: 'Cyber',
    sourceForumColor: 'red',
    sourceRef: 'GOV-142 · Cyber MANCO April 2026',
    sourceCitation: 'Meeting · Cyber MANCO · 15 Apr 2026 · "PaymentGate contract review to be completed by end of May"',
    linkedRisk: 'R-041',
    confidenceGrade: 'A',
    draftJira: {
      key: 'GOV-142',
      type: 'Management Action', project: 'GOV',
      summary: 'PaymentGate — scoped contract review (superseded by GOV-378)',
      priority: 'Medium',
      labels: ['source:cyber-manco','vendor:paymentgate','legacy','risk:R-041']
    }
  },
  {
    id: 'LEG-2',
    text: 'Legacy MFA rollout review — hospitality applications',
    ownerCandidate: 'Anita Rees',
    ownerConfidence: 1.0,
    dueDate: '2026-07-03', dueLabel: '3 Jul (17 days overdue)',
    priority: 'Medium',
    priorityRationale: 'Legacy carry-over',
    sourceType: 'Meeting',
    sourceForum: 'Cyber',
    sourceForumColor: 'red',
    sourceRef: 'GOV-138',
    sourceCitation: 'Meeting · Cyber MANCO · 4 Jun 2026',
    linkedRisk: null,
    confidenceGrade: 'A',
    draftJira: {
      key: 'GOV-138',
      type: 'Management Action', project: 'GOV',
      summary: 'MFA rollout — hospitality apps assessment',
      priority: 'Medium',
      labels: ['source:cyber-manco','identity','legacy']
    }
  },
  {
    id: 'LEG-3',
    text: 'Legacy ARB action — Cloud LZ v1 decommissioning schedule',
    ownerCandidate: 'Kenji Tanaka',
    ownerConfidence: 1.0,
    dueDate: '2026-07-10', dueLabel: '10 Jul (10 days overdue)',
    priority: 'Low',
    priorityRationale: 'Legacy carry-over',
    sourceType: 'Meeting',
    sourceForum: 'ARB',
    sourceForumColor: 'blue',
    sourceRef: 'EAG-092',
    sourceCitation: 'Meeting · ARB · 25 Jun 2026',
    linkedRisk: null,
    confidenceGrade: 'A',
    draftJira: {
      key: 'EAG-092',
      type: 'Governance Item', project: 'EAG',
      summary: 'Cloud LZ v1 — decommissioning schedule',
      priority: 'Low',
      labels: ['source:arb','cloud','legacy']
    }
  },
  {
    id: 'LEG-4',
    text: 'Legacy Service action — Contact Centre desktop upgrade evidence',
    ownerCandidate: 'Emma Foster',
    ownerConfidence: 1.0,
    dueDate: '2026-07-12', dueLabel: '12 Jul (8 days overdue)',
    priority: 'Low',
    priorityRationale: 'Legacy carry-over',
    sourceType: 'Meeting',
    sourceForum: 'Service',
    sourceForumColor: 'amber',
    sourceRef: 'SIP-289',
    sourceCitation: 'Meeting · Service Management MANCO · 20 Jun 2026',
    linkedRisk: null,
    confidenceGrade: 'A',
    draftJira: {
      key: 'SIP-289',
      type: 'Service Improvement', project: 'SIP',
      summary: 'Contact Centre desktop upgrade — completion evidence',
      priority: 'Low',
      labels: ['source:service-manco','sip','legacy']
    }
  }
];

/* Status map — deterministic status per ticket key so the demo is reproducible.
   Anything not listed will be given a sensible default by the aggregator. */
window.ACTIONS_STATUS = {
  // Cyber MANCO (created 8-9 Jul, today = 20 Jul)
  'GOV-378': 'In Progress',      // due 22 Jul
  'GOV-379': 'Done',             // due 15 Jul (post-incident report published)
  'GOV-381': 'Done',             // due 14 Jul (SteerCo delivered)
  'GOV-382': 'Done',             // due 9 Jul (ARB raised)
  'GOV-383': 'In Progress',      // due 18 Jul
  'GOV-384': 'Done',             // due 12 Jul (phishing report)
  'GOV-385': 'In Progress',      // due 5 Aug
  'GOV-386': 'Done',             // due 11 Jul (audit pack sent)
  'GOV-387': 'In Progress',      // due 25 Jul
  // ARB (created 9 Jul)
  'EAG-121': 'Done',             // due 20 Jul → cutting it fine but done
  'EAG-122': 'In Progress',      // due 8 Aug
  'EAG-123': 'In Progress',      // due 30 Jul
  'EAG-124': 'Done',             // due 9 Jul (in-meeting minute)
  'EAG-125': 'In Progress',      // due 30 Jul
  'EAG-126': 'In Progress',      // due 25 Jul
  // Risk MANCO (created 10 Jul)
  'RSK-201': 'In Progress',      // due 31 Jul
  'RSK-202': 'Done',             // due 14 Jul (SteerCo delivered)
  'FIN-141': 'Done',             // due 14 Jul (SteerCo delivered)
  'RSK-203': 'In Progress',      // due 24 Jul
  'RSK-204': 'Triage',           // due 31 Aug
  'RSK-205': 'Triage',           // due 30 Sep
  // Service MANCO (created 11 Jul)
  'SIP-311': 'Done',             // due 18 Jul (July P1 report published)
  'SIP-312': 'In Progress',      // due 15 Aug
  'SIP-313': 'In Progress',      // due 22 Jul
  'SIP-314': 'Done',             // due 13 Jul (CAB review done)
  'SIP-315': 'In Progress',      // due 20 Jul
  // SteerCo (created 14 Jul)
  'GOV-401': 'In Progress',      // due 21 Jul
  'GOV-402': 'In Progress',      // due 25 Jul
  'GOV-403': 'In Progress',      // due 21 Jul
  'FIN-142': 'In Progress',      // due 31 Jul
  'GOV-404': 'In Progress',      // due 25 Jul
  'GOV-405': 'In Progress',      // due 30 Jul
  'PMO-501': 'Triage',           // due 15 Aug
  'GOV-406': 'Done',             // due 16 Jul (minutes circulated)
  // Non-meeting
  'GOV-390': 'Overdue',          // due 17 Jul (3 days overdue) — email from Fiona
  'FIN-143': 'In Progress',      // due 20 Jul (today) — email from Fiona
  'AUD-202': 'In Progress',      // due 22 Jul — email from auditor
  'GOV-391': 'Done',             // due 18 Jul — Teams #cio-cabinet
  'GOV-392': 'Done',             // due 15 Jul — Teams war-room
  'AUD-201': 'In Progress',      // due 25 Jul — SharePoint DORA update
  // Legacy overdue
  'GOV-142': 'Overdue',          // due 6 May (75 days)
  'GOV-138': 'Overdue',          // due 3 Jul (17 days)
  'EAG-092': 'Overdue',          // due 10 Jul (10 days)
  'SIP-289': 'Overdue'           // due 12 Jul (8 days)
};

/* Recent agent activity feed — what the AI has done in the last 12 hours */
window.AGENT_ACTIVITY = [
  { time: '07:12 today',    agent: 'Jira Admin',       initials: 'JA', color: 'teal',  action: 'Sent T-1 reminder for GOV-378 to Priya Deshmukh (due 22 Jul) via Teams' },
  { time: '06:58 today',    agent: 'Correlation',      initials: 'CO', color: 'red',   action: 'Flagged 4 tickets across Cyber/Service/Risk/SteerCo forums as PaymentGate cross-forum theme' },
  { time: '06:45 today',    agent: 'Jira Admin',       initials: 'JA', color: 'teal',  action: 'Escalated GOV-142 to Priya Deshmukh\\'s manager (T+7 rule triggered, 75 days overdue)' },
  { time: '06:30 today',    agent: 'Executive Reporting', initials: 'ER', color: 'navy', action: 'Composed weekly executive pack · 8 recommendations · published to SharePoint' },
  { time: '06:15 today',    agent: 'Portfolio',        initials: 'PM', color: 'blue',  action: 'Forecast: 3 SteerCo actions predicted to slip (GOV-402, GOV-403 confidence 78%)' },
  { time: '05:50 today',    agent: 'Cloud Optimization', initials: 'CO', color: 'amber', action: 'Identified 3 new rightsizing opportunities · £42k/yr savings · draft tickets queued' },
  { time: '22:14 yesterday', agent: 'Jira Admin',       initials: 'JA', color: 'teal',  action: 'Auto-linked EAG-123 → EAG-124 (DORA event-logging exception → target-state design)' },
  { time: '17:34 yesterday', agent: 'Meeting Intelligence', initials: 'MI', color: 'navy', action: 'Ingested SteerCo 14 Jul minutes · 8 actions drafted · HITL approved by Chloe Bennett' },
  { time: '16:02 yesterday', agent: 'Action Extraction', initials: 'AX', color: 'teal',  action: 'Detected commitment in Teams #cio-cabinet · GOV-391 drafted for Priya Kapoor' },
  { time: '14:18 yesterday', agent: 'Audit & Risk',     initials: 'AR', color: 'red',   action: 'Ingested DORA-July-2026-Update.pdf from SharePoint · AUD-201 drafted for Angela Rossi' }
];

/* Reminders to be sent by the Jira Admin Agent today */
window.REMINDERS_TODAY = [
  { time: '09:00', channel: 'Teams DM', to: 'Ahmed Khan',      target: 'FIN-143', rule: 'T+0 · due today',    message: 'Your action FIN-143 is due today (FY27 cloud controls FinOps alignment). Reply DONE when complete or REMIND to snooze.' },
  { time: '09:00', channel: 'Teams DM', to: 'Julian Cross',    target: 'SIP-315', rule: 'T+0 · due today',    message: 'Merchant availability SLA post-mortem due today (SIP-315). Draft report needed by EOD.' },
  { time: '09:15', channel: 'Teams DM', to: 'Ravi Chandran',   target: 'GOV-401', rule: 'T-1 · due tomorrow', message: 'PaymentGate contract review + exit-clause preparation due tomorrow (GOV-401).' },
  { time: '09:15', channel: 'Teams DM', to: 'Fiona Delacroix', target: 'GOV-403', rule: 'T-1 · due tomorrow', message: 'DORA Q3 funding release due tomorrow (GOV-403 · £1.2M).' },
  { time: '10:00', channel: 'Email',    to: 'Line Manager (Priya D.)', target: 'GOV-142', rule: 'T+7 escalation', message: 'GOV-142 remains open 75 days beyond due date. Please intervene.' },
  { time: '10:00', channel: 'Email',    to: 'Line Manager (Anita R.)', target: 'GOV-138', rule: 'T+7 escalation', message: 'GOV-138 (MFA rollout — hospitality apps) is 17 days overdue.' },
  { time: '14:00', channel: 'Teams DM', to: 'Anita Rees',      target: 'GOV-387', rule: 'T-3 · due Fri 25',   message: 'MFA legacy options paper for ARB due Friday 25 Jul (GOV-387). Draft in Confluence?' },
  { time: '14:00', channel: 'Teams DM', to: 'Elena Rivera',    target: 'EAG-126', rule: 'T-3 · due Fri 25',   message: 'DORA CIF mapping ownership sign-off due Friday 25 Jul (EAG-126).' }
];
