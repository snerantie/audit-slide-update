/* Cyber MANCO — 8 July 2026 — the demo's "hero" meeting.
   Contains raw minute text (as HTML with entity highlights) plus the
   fully-processed output the agents would extract. */

window.MEETING_CYBER = {
  id: 'cyber-manco-2026-07-08',
  forum: 'Cyber MANCO',
  forumShort: 'Cyber',
  forumColor: 'red',
  date: '2026-07-08',
  dateLabel: 'Wed · 8 July 2026',
  time: '14:00 – 15:30 BST',
  chair: 'Sarah Whitmore, Chief Information Security Officer',
  location: 'Teams · Recorded · Transcript enabled',
  meetingType: 'Governance (monthly)',
  minutesAuthor: 'Draft prepared by Meeting Intelligence Agent · reviewed by secretariat',
  attendees: [
    { name: 'Sarah Whitmore',   role: 'CISO (Chair)' },
    { name: 'David Ochoa',      role: 'Head of Application Security' },
    { name: 'Priya Deshmukh',   role: 'Head of Third-Party Risk' },
    { name: 'James Kellner',    role: 'Head of Incident Response' },
    { name: 'Marcus Wilkins',   role: 'Head of Cloud Security' },
    { name: 'Anita Rees',       role: 'Head of Identity & Access' },
    { name: 'Chloe Bennett',    role: 'Secretariat (minutes)' }
  ],
  regrets: [
    { name: 'Ravi Chandran', role: 'CIO' }
  ],
  agenda: [
    'PaymentGate P1 incident post-mortem (Kellner)',
    'DORA ICT third-party register progress (Deshmukh)',
    'Q3 phishing campaign results (Wilkins)',
    'Wealth Digital penetration test findings (Ochoa)',
    'MFA rollout to legacy applications (Rees)',
    'AOB'
  ],

  /* Minute rendered as HTML. Entity highlights are pre-marked with
     data-ref attributes so the UI can cross-highlight when the user
     hovers on an extracted item in the right pane. */
  minuteHtml: `
    <h1>Cyber MANCO — Minutes</h1>
    <p class="tt-attendee"><strong>Date:</strong> Wednesday, 8 July 2026, 14:00–15:30 BST · <strong>Chair:</strong> Sarah Whitmore (CISO) · <strong>Meeting type:</strong> Governance (monthly)</p>
    <p class="tt-attendee"><strong>Attendees:</strong> Sarah Whitmore (chair), David Ochoa, Priya Deshmukh, James Kellner, Marcus Wilkins, Anita Rees, Chloe Bennett (secretariat). <strong>Regrets:</strong> Ravi Chandran.</p>

    <h2>1 · PaymentGate P1 Incident — Post-Mortem</h2>
    <p>James Kellner opened with the post-incident review of the <span class="tt-highlight-risk" data-ref="r-1" title="Risk raised — see extracted risks">3 July P1 outage on the PaymentGate merchant gateway</span>. Root cause was a certificate rotation failure on the vendor side; the vendor's on-call did not respond within the contractually agreed 15-minute window and the SLA was breached for the third consecutive month. Total customer impact was 47 minutes and approximately £420k in delayed settlement transactions, plus reputational impact with two Tier-1 merchants who have written formally.</p>
    <p>Priya Deshmukh noted that this is now the fourth PaymentGate SLA breach in six months. Contract review was completed in April but no exit clause has been invoked. The vendor's UK entity was recently acquired by a US private-equity firm and their senior engineering team appears to have thinned. <span class="tt-highlight-action" data-ref="a-1" title="Action extracted — see A-1">Priya to raise the PaymentGate contract exit clause with Procurement and Legal by 22 July.</span></p>
    <p>Sarah Whitmore asked whether this rises to a Critical risk. Consensus reached: yes, given concentration on this vendor for merchant flows worth ~£180M/yr. <span class="tt-highlight-decision" data-ref="d-1" title="Decision extracted — see D-1">Decision: uplift Risk R-041 (PaymentGate SLA) from High to Critical and escalate to SteerCo.</span> <span class="tt-highlight-action" data-ref="a-2" title="Action extracted — see A-2">James Kellner to prepare the post-incident report and cross-link to R-041 by 15 July.</span> <span class="tt-highlight-action" data-ref="a-3" title="Action extracted — see A-3">Sarah Whitmore to take R-041 uplift and PaymentGate concentration to SteerCo on 14 July.</span></p>

    <h2>2 · DORA ICT Third-Party Register</h2>
    <p>Priya Deshmukh presented DORA readiness on the ICT third-party register. 84 of 92 material providers now classified; 8 remaining are boutique providers under review by Procurement. The register hits the DORA definition of 'complete' at 91% today. Target of 100% by 30 September is at risk if the boutique reviews are not fast-tracked.</p>
    <p>David Ochoa flagged that the register does not yet include a mapping of which providers support 'critical or important functions' (CIFs) under DORA Article 30. This mapping had been assumed complete by Cyber but is owned by Architecture. <span class="tt-highlight-action" data-ref="a-4" title="Action extracted — see A-4">Sarah Whitmore to raise CIF mapping ownership with the Chief Architect at ARB tomorrow (9 July).</span> <span class="tt-highlight-action" data-ref="a-5" title="Action extracted — see A-5">Priya Deshmukh to draft the CIF mapping proposal for Architecture review by 18 July.</span></p>

    <h2>3 · Q3 Phishing Campaign Results</h2>
    <p>Marcus Wilkins presented Q3 phishing campaign results: 4.1% click rate (target &lt; 5%; prior quarter 5.8%). Repeat clickers reduced from 91 to 43. Contact Centre and Finance business units remain above the average and targeted training was approved. <span class="tt-highlight-action" data-ref="a-6" title="Action extracted — see A-6">Marcus to publish the full Q3 phishing report by 12 July.</span></p>
    <p>Anita Rees noted that 23 users who clicked in Q3 also clicked in Q2. <span class="tt-highlight-action" data-ref="a-7" title="Action extracted — see A-7">Anita to review whether these users should have enhanced monitoring applied for 90 days, and report back at next Cyber MANCO.</span></p>

    <h2>4 · Wealth Digital — Penetration Test</h2>
    <p>David Ochoa summarised findings from the external penetration test on Wealth Digital pre-launch: 3 High findings, 12 Medium, 26 Low. All Highs are remediated. The most notable High was insufficient rate-limiting on the customer-onboarding API — patched on 5 July. <span class="tt-highlight-decision" data-ref="d-2" title="Decision extracted — see D-2">Decision: Wealth Digital cyber sign-off issued conditional on Medium remediation by 30 July.</span></p>
    <p>James Kellner asked whether findings had been shared with Internal Audit as part of the pre-Go-Live evidence pack. <span class="tt-highlight-action" data-ref="a-8" title="Action extracted — see A-8">David to send the findings pack to Internal Audit by 11 July.</span></p>

    <h2>5 · MFA to Legacy Applications</h2>
    <p>Sarah Whitmore raised that MFA rollout to legacy applications remains at 78% coverage (target 95% by year-end). Two systems (LegacyCRM, TreasuryWorks) are hard blockers due to protocol incompatibility. <span class="tt-highlight-risk" data-ref="r-2" title="Risk raised — see extracted risks">Residual risk on LegacyCRM authentication was noted for the risk register.</span> An options paper is required for ARB. <span class="tt-highlight-action" data-ref="a-9" title="Action extracted — see A-9">Anita to prepare the MFA legacy options paper for ARB by 25 July.</span></p>

    <h2>6 · AOB</h2>
    <p>No further business. <span class="tt-highlight-decision" data-ref="d-3" title="Decision extracted — see D-3">Decision: next Cyber MANCO scheduled for 5 August; PaymentGate to remain standing agenda item until R-041 is downgraded.</span></p>

    <p class="tt-attendee" style="margin-top: 24px; font-style: italic;">Meeting closed at 15:28. Draft minutes prepared by Meeting Intelligence Agent · reviewed by Chloe Bennett · approved for circulation by Sarah Whitmore.</p>
  `,

  /* ---------- Processed output — what the agents will "extract" ---------- */

  processed: {
    summary: `Cyber MANCO covered a critical vendor SLA breach (PaymentGate, 4th in 6 months, £420k customer impact, escalating to SteerCo as R-041 Critical), DORA third-party register progress (91% complete, CIF mapping gap identified), Q3 phishing (4.1%, on target), Wealth Digital pen test (all Highs remediated, conditional sign-off), and MFA legacy coverage (78%, options paper for ARB). Nine actions extracted; three decisions recorded; two risks — one uplifted, one new for the register.`,

    decisions: [
      { id: 'D-1', text: 'Uplift Risk R-041 (PaymentGate SLA) from High to Critical and escalate to SteerCo.', ownedBy: 'Sarah Whitmore', citation: 'Item 1' },
      { id: 'D-2', text: 'Wealth Digital cyber sign-off issued conditional on Medium remediation by 30 July.', ownedBy: 'David Ochoa', citation: 'Item 4' },
      { id: 'D-3', text: 'PaymentGate to remain standing agenda item until R-041 is downgraded.', ownedBy: 'Chair', citation: 'Item 6' }
    ],

    risks: [
      { id: 'R-041', type: 'existing-uplifted', title: 'Vendor SLA — PaymentGate', from: 'High', to: 'Critical', driver: '4th SLA breach in 6 months; vendor engineering team thinning post-acquisition', linkedActions: ['A-1','A-2','A-3'] },
      { id: 'R-NEW-1', type: 'new-candidate', title: 'LegacyCRM authentication residual risk', rating: 'Medium', driver: 'MFA rollout blocked by protocol incompatibility on LegacyCRM', linkedActions: ['A-9'] }
    ],

    /* Nine action candidates with the fields the Action Extraction Agent
       and Jira Admin Agent would produce. */
    actions: [
      {
        id: 'A-1',
        text: 'Raise PaymentGate contract exit clause with Procurement and Legal',
        ownerCandidate: 'Priya Deshmukh',
        ownerConfidence: 0.98,
        dueDate: '2026-07-22',
        dueLabel: '22 Jul',
        priority: 'High',
        priorityRationale: 'Vendor concentration £180M/yr; 4th breach; regulatory sensitivity',
        sourceItem: 'Item 1',
        sourceQuote: '"Priya to raise with Procurement and legal by 22 July."',
        dedup: { type: 'related', ticket: 'GOV-142', title: 'PaymentGate contract review (May 2026)', reason: 'Related, not duplicate — that was scoped review; this is exit-clause invocation' },
        linkedRisk: 'R-041',
        confidenceGrade: 'B',
        draftJira: {
          key: 'GOV-378',
          type: 'Management Action',
          project: 'GOV',
          summary: 'PaymentGate — raise contract exit clause with Procurement + Legal',
          priority: 'High',
          labels: ['source:cyber-manco','vendor:paymentgate','forum:cyber','risk:R-041']
        }
      },
      {
        id: 'A-2',
        text: 'Prepare post-incident report for PaymentGate 3 July outage and cross-link to R-041',
        ownerCandidate: 'James Kellner',
        ownerConfidence: 0.99,
        dueDate: '2026-07-15',
        dueLabel: '15 Jul',
        priority: 'High',
        priorityRationale: 'Required before SteerCo escalation on 14 Jul',
        sourceItem: 'Item 1',
        sourceQuote: '"James Kellner to prepare the post-incident report and cross-link to R-041 by 15 July."',
        dedup: null,
        linkedRisk: 'R-041',
        confidenceGrade: 'A',
        draftJira: {
          key: 'GOV-379',
          type: 'Management Action',
          project: 'GOV',
          summary: 'PaymentGate 3 Jul P1 — post-incident report + link to R-041',
          priority: 'High',
          labels: ['source:cyber-manco','incident','vendor:paymentgate','risk:R-041']
        }
      },
      {
        id: 'A-3',
        text: 'Escalate R-041 uplift and PaymentGate concentration to SteerCo on 14 July',
        ownerCandidate: 'Sarah Whitmore',
        ownerConfidence: 0.97,
        dueDate: '2026-07-14',
        dueLabel: '14 Jul',
        priority: 'Critical',
        priorityRationale: 'Chair-level commitment; SteerCo date fixed',
        sourceItem: 'Item 1',
        sourceQuote: '"Sarah Whitmore to take R-041 uplift and PaymentGate concentration to SteerCo on 14 July."',
        dedup: { type: 'auto-link', ticket: 'GOV-380', title: 'SteerCo 14 Jul agenda item — Payments programme', reason: 'Auto-linked to SteerCo agenda ticket as sub-item' },
        linkedRisk: 'R-041',
        confidenceGrade: 'A',
        draftJira: {
          key: 'GOV-381',
          type: 'Management Action',
          project: 'GOV',
          summary: 'SteerCo 14 Jul — present R-041 uplift and PaymentGate concentration',
          priority: 'Critical',
          labels: ['source:cyber-manco','forum:steerco','risk:R-041']
        }
      },
      {
        id: 'A-4',
        text: 'Raise DORA CIF mapping ownership with Chief Architect at ARB (9 July)',
        ownerCandidate: 'Sarah Whitmore',
        ownerConfidence: 0.96,
        dueDate: '2026-07-09',
        dueLabel: '9 Jul (tomorrow)',
        priority: 'High',
        priorityRationale: 'Regulatory deadline 30 Sep; ARB is next day',
        sourceItem: 'Item 2',
        sourceQuote: '"Sarah Whitmore to raise CIF mapping ownership with the Chief Architect at ARB tomorrow."',
        dedup: { type: 'related', ticket: 'EAG-088', title: 'DORA Article 30 CIF register — Architecture ownership TBC', reason: 'Related architecture-side ticket already exists' },
        linkedRisk: 'R-014',
        confidenceGrade: 'A',
        draftJira: {
          key: 'GOV-382',
          type: 'Management Action',
          project: 'GOV',
          summary: 'DORA CIF mapping — raise ownership at ARB (9 Jul)',
          priority: 'High',
          labels: ['source:cyber-manco','regulation:DORA','forum:arb']
        }
      },
      {
        id: 'A-5',
        text: 'Draft DORA CIF mapping proposal for Architecture review',
        ownerCandidate: 'Priya Deshmukh',
        ownerConfidence: 0.95,
        dueDate: '2026-07-18',
        dueLabel: '18 Jul',
        priority: 'Medium',
        priorityRationale: 'Feeds into 30 Sep regulatory deadline',
        sourceItem: 'Item 2',
        sourceQuote: '"Priya Deshmukh to draft the CIF mapping proposal for Architecture review by 18 July."',
        dedup: null,
        linkedRisk: 'R-014',
        confidenceGrade: 'A',
        draftJira: {
          key: 'GOV-383',
          type: 'Management Action',
          project: 'GOV',
          summary: 'DORA CIF mapping — draft proposal for Architecture review',
          priority: 'Medium',
          labels: ['source:cyber-manco','regulation:DORA']
        }
      },
      {
        id: 'A-6',
        text: 'Publish full Q3 phishing campaign report',
        ownerCandidate: 'Marcus Wilkins',
        ownerConfidence: 0.99,
        dueDate: '2026-07-12',
        dueLabel: '12 Jul',
        priority: 'Low',
        priorityRationale: 'Reporting, no downstream dependency',
        sourceItem: 'Item 3',
        sourceQuote: '"Marcus to publish the full Q3 phishing report by 12 July."',
        dedup: null,
        linkedRisk: null,
        confidenceGrade: 'A',
        draftJira: {
          key: 'GOV-384',
          type: 'Management Action',
          project: 'GOV',
          summary: 'Q3 phishing report — publish',
          priority: 'Low',
          labels: ['source:cyber-manco','awareness','reporting']
        }
      },
      {
        id: 'A-7',
        text: 'Review enhanced monitoring for repeat phishing clickers (Q2+Q3)',
        ownerCandidate: 'Anita Rees',
        ownerConfidence: 0.97,
        dueDate: '2026-08-05',
        dueLabel: '5 Aug (next Cyber MANCO)',
        priority: 'Low',
        priorityRationale: 'Follow-up review; not urgent',
        sourceItem: 'Item 3',
        sourceQuote: '"Anita to review whether these users should have enhanced monitoring applied for 90 days."',
        dedup: null,
        linkedRisk: null,
        confidenceGrade: 'B',
        draftJira: {
          key: 'GOV-385',
          type: 'Management Action',
          project: 'GOV',
          summary: 'Enhanced monitoring policy for repeat phishing clickers — review',
          priority: 'Low',
          labels: ['source:cyber-manco','identity','awareness']
        }
      },
      {
        id: 'A-8',
        text: 'Share Wealth Digital pen test findings with Internal Audit (pre-Go-Live evidence pack)',
        ownerCandidate: 'David Ochoa',
        ownerConfidence: 0.99,
        dueDate: '2026-07-11',
        dueLabel: '11 Jul',
        priority: 'Medium',
        priorityRationale: 'Blocking evidence for audit-supported Go-Live',
        sourceItem: 'Item 4',
        sourceQuote: '"David to send by 11 July."',
        dedup: null,
        linkedRisk: null,
        confidenceGrade: 'A',
        draftJira: {
          key: 'GOV-386',
          type: 'Management Action',
          project: 'GOV',
          summary: 'Wealth Digital pen test findings — send to Internal Audit',
          priority: 'Medium',
          labels: ['source:cyber-manco','wealth-digital','audit']
        }
      },
      {
        id: 'A-9',
        text: 'Prepare MFA legacy options paper for ARB',
        ownerCandidate: 'Anita Rees',
        ownerConfidence: 0.98,
        dueDate: '2026-07-25',
        dueLabel: '25 Jul',
        priority: 'Medium',
        priorityRationale: 'Feeds year-end 95% MFA coverage target',
        sourceItem: 'Item 5',
        sourceQuote: '"Anita to prepare the MFA legacy options paper for ARB by 25 July."',
        dedup: null,
        linkedRisk: 'R-NEW-1',
        confidenceGrade: 'A',
        draftJira: {
          key: 'GOV-387',
          type: 'Management Action',
          project: 'GOV',
          summary: 'MFA to legacy applications — options paper for ARB',
          priority: 'Medium',
          labels: ['source:cyber-manco','identity','forum:arb']
        }
      }
    ]
  },

  /* Cross-forum correlation signals the agents will surface */
  correlations: [
    { type: 'cross-forum-theme',
      theme: 'PaymentGate vendor SLA',
      forums: ['Cyber MANCO','Service MANCO','Risk MANCO','SteerCo (upcoming)'],
      severity: 'critical',
      note: 'Same underlying issue discussed in 4 forums over 6 days. No accountable owner until now.'
    },
    { type: 'cross-forum-theme',
      theme: 'DORA readiness',
      forums: ['Cyber MANCO','ARB','Risk MANCO','SteerCo (upcoming)'],
      severity: 'high',
      note: 'CIF mapping ownership gap surfaces coordinated action across Cyber, Architecture, Risk.'
    }
  ]
};
