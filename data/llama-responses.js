/* Cached Llama 3.3 70B responses for the Ask-the-Tower demo.
   Each entry contains the question, a rich HTML answer, cited sources,
   suggested follow-up prompt IDs and agent metadata.
   For live-mode operation, see assets/js/tower-llama.js — the shape of
   these answers is what a real Groq call would return. */

window.LLAMA_QA = {

  /* ============ CORRELATION & THEMES ============ */

  'themes-6-meetings': {
    id: 'themes-6-meetings',
    category: 'Themes & Correlation',
    question: 'What are the recurring themes across the last 6 governance meetings?',
    answerHtml: `
      <p>Over the past 6 days, the Correlation Agent identified <strong>6 recurring themes</strong> across your 5 governance forums:</p>
      <ol class="mt-3 space-y-2">
        <li><strong>PaymentGate vendor SLA (Critical)</strong> — 4 of 5 forums; escalated to SteerCo 14 Jul; £180M/yr concentration; recovery plan mandated. <em>12 linked tickets.</em></li>
        <li><strong>DORA readiness (High)</strong> — CIF mapping ownership loop closed at ARB → SteerCo; £1.2M Q3 uplift approved. <em>8 linked tickets.</em></li>
        <li><strong>FY26 cloud budget variance (High)</strong> — 6% MTD overrun; SteerCo accepted variance; FY27 controls proposal due 31 Jul.</li>
        <li><strong>MFA legacy coverage (Medium)</strong> — Cross-links Cyber → ARB → Oracle sunset. A 3-hop blocker chain was identified.</li>
        <li><strong>Wealth Digital Go-Live</strong> — Cyber sign-off conditional on pen-test Medium remediation by 30 Jul.</li>
        <li><strong>Data Platform Go-Live</strong> — Gates 6 &amp; 7 conditionally signed off; gate 8 due 25 Jul.</li>
      </ol>
      <p class="mt-3">Two <strong>silent risks</strong> were also detected — <em>merchant reputational exposure</em> (2 Tier-1 letters after 3 Jul outage) and <em>Wealth Digital cyber sign-off dependency</em> — both are draft R-NEW risks awaiting the next Risk MANCO.</p>
    `,
    citations: [
      { label: 'SteerCo · 14 Jul', href: 'meeting.html?id=steerco-2026-07-14' },
      { label: 'Cyber MANCO · 8 Jul', href: 'meeting.html?id=cyber-manco-2026-07-08' },
      { label: 'Risk MANCO · 10 Jul', href: 'meeting.html?id=risk-manco-2026-07-10' },
      { label: 'Service MANCO · 11 Jul', href: 'meeting.html?id=service-manco-2026-07-11' },
      { label: 'ARB · 9 Jul', href: 'meeting.html?id=arb-2026-07-09' },
      { label: 'Correlation view', href: 'correlation.html' }
    ],
    followUpIds: ['paymentgate-actions','dora-status','silent-risks'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1420, tokensIn: 812, tokensOut: 328, confidence: 'A' }
  },

  'paymentgate-actions': {
    id: 'paymentgate-actions',
    category: 'Themes & Correlation',
    question: 'Show me every action linked to PaymentGate',
    answerHtml: `
      <p>Here are the <strong>12 tickets</strong> the Correlation Agent has linked to the PaymentGate theme over the last 8 days:</p>
      <p class="mt-3"><strong class="text-red-700">Critical (2)</strong></p>
      <ul class="text-sm ml-4 mt-1 space-y-0.5">
        <li>• <code class="font-mono text-slate-700">GOV-401</code> · Formal contract review + exit-clause preparation · Ravi Chandran · <strong>Due 21 Jul</strong></li>
        <li>• <code class="font-mono text-slate-700">GOV-402</code> · Payments Modernisation recovery plan · Vikram Patel · <strong>Due 25 Jul</strong></li>
      </ul>
      <p class="mt-3"><strong class="text-red-700">High (4)</strong></p>
      <ul class="text-sm ml-4 mt-1 space-y-0.5">
        <li>• <code class="font-mono text-slate-700">GOV-378</code> · Contract exit clause review · Priya Deshmukh · Due 22 Jul</li>
        <li>• <code class="font-mono text-slate-700">GOV-379</code> · Post-incident report · James Kellner · <span class="text-green-700">Done ✓</span></li>
        <li>• <code class="font-mono text-slate-700">SIP-311</code> · July P1 root-cause report · Tom Nakamura · <span class="text-green-700">Done ✓</span></li>
        <li>• <code class="font-mono text-slate-700">SIP-313</code> · Payments SIP acceleration · Vikram Patel · Due 22 Jul</li>
      </ul>
      <p class="mt-3"><strong class="text-amber-700">Medium (5)</strong></p>
      <ul class="text-sm ml-4 mt-1 space-y-0.5">
        <li>• <code class="font-mono text-slate-700">GOV-381</code> · SteerCo escalation · Sarah Whitmore · <span class="text-green-700">Done ✓</span></li>
        <li>• <code class="font-mono text-slate-700">STE-A8</code> · Third-party concentration plan · Marcus Bell · Due 31 Jul</li>
        <li>• <code class="font-mono text-slate-700">RSK-201</code> · Concentration treatment plan · Marcus Bell · Due 31 Jul</li>
        <li>• <code class="font-mono text-slate-700">GOV-392</code> · Payments war-room daily standup · Vikram Patel · <span class="text-green-700">Done ✓</span></li>
        <li>• <code class="font-mono text-slate-700">GOV-142</code> · Original April contract review · Priya Deshmukh · <strong class="text-red-700">OVERDUE 75 days</strong> (superseded by GOV-378)</li>
      </ul>
      <p class="mt-3"><strong>Linked risks:</strong> R-041 (Critical, uplifted 14 Jul), R-NEW-3 (Critical, third-party concentration).</p>
    `,
    citations: [
      { label: 'Actions Register', href: 'actions.html' },
      { label: 'R-041 risk', href: '#' },
      { label: 'Correlation · PaymentGate story', href: 'correlation.html' }
    ],
    followUpIds: ['payments-red','who-owns-concentration','top-3-cio'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1210, tokensIn: 634, tokensOut: 512, confidence: 'A' }
  },

  'silent-risks': {
    id: 'silent-risks',
    category: 'Themes & Correlation',
    question: 'What silent risks have you detected?',
    answerHtml: `
      <p>Two "silent risks" — mentioned in governance minutes but not yet in the GRC risk register — are queued for the next Risk MANCO on 7 August:</p>
      <ol class="mt-3 space-y-2">
        <li>
          <strong>Merchant reputational exposure</strong> (proposed <code class="font-mono text-slate-700">R-NEW-9</code>, Medium)<br>
          <span class="text-slate-600 text-xs">Detected 06:58 today. Two Tier-1 merchants wrote formal complaint letters after the 3 Jul PaymentGate outage. Referenced in Cyber MANCO minute item 1 and Service MANCO minute item 5, but no owner in Archer.</span>
        </li>
        <li>
          <strong>Wealth Digital cyber sign-off dependency</strong> (proposed <code class="font-mono text-slate-700">R-NEW-8</code>, Medium)<br>
          <span class="text-slate-600 text-xs">Cyber sign-off was made <em>conditional</em> on Medium pen-test remediation by 30 Jul. If remediation slips, Go-Live is blocked. Referenced in Cyber MANCO 8 Jul (D-2) and SteerCo 14 Jul (STE-A6) but no explicit risk record.</span>
        </li>
      </ol>
      <p class="mt-3">Both have draft risk-register entries prepared by the Audit &amp; Risk Agent. Awaiting Marcus Bell's approval — see the HITL queue.</p>
    `,
    citations: [
      { label: 'Cyber MANCO · 8 Jul', href: 'meeting.html?id=cyber-manco-2026-07-08' },
      { label: 'Service MANCO · 11 Jul', href: 'meeting.html?id=service-manco-2026-07-11' },
      { label: 'SteerCo · 14 Jul', href: 'meeting.html?id=steerco-2026-07-14' }
    ],
    followUpIds: ['who-owns-concentration','emerging-risks','draft-manco-paper-dora'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 980, tokensIn: 452, tokensOut: 268, confidence: 'A' }
  },

  /* ============ PROGRAMME & DELIVERY ============ */

  'payments-red': {
    id: 'payments-red',
    category: 'Programme & Delivery',
    question: 'Why is Payments Modernisation red?',
    answerHtml: `
      <p>Payments Modernisation moved from Amber to <strong class="text-red-700">RED</strong> at SteerCo on 14 July (decision D-STE-1). Four drivers:</p>

      <p class="mt-3"><strong>Schedule</strong> — 3-week slip against baseline. Q3 milestone dependency chain shows recovery plan due 25 Jul (<code class="font-mono">GOV-402</code>). Portfolio Agent forecasts <strong>78% probability of further slip</strong> without intervention.</p>

      <p class="mt-2"><strong>Financial</strong> — £2.1M budget overrun. Cost data pulled from Anaplan; primary driver is scope expansion from Q2 recovery efforts plus vendor rate increases.</p>

      <p class="mt-2"><strong>Vendor risk</strong> — R-041 (PaymentGate SLA) uplifted from High to Critical at SteerCo. Fourth SLA breach in six months; two July P1 incidents (3 Jul 47min, 7 Jul 22min) both traced to vendor-side reliability. Contract exit-clause preparation now authorised via Procurement + Legal.</p>

      <p class="mt-2"><strong>Cross-forum signal</strong> — Correlation Agent identified this as the top cross-forum theme this week: <a href="correlation.html" class="text-teal-700 underline">4 forums, 6 days, 12 linked tickets</a>. Payments war-room stood up on 12 Jul (<code class="font-mono">GOV-392</code>).</p>

      <p class="mt-3 text-slate-600"><em>What happens next:</em> Recovery plan (<code class="font-mono">GOV-402</code>) due 25 July; CIO-led vendor track (<code class="font-mono">GOV-401</code>) due 21 July. Payments now a standing SteerCo agenda item until R-041 is downgraded.</p>
    `,
    citations: [
      { label: 'SteerCo · 14 Jul · items 1-2', href: 'meeting.html?id=steerco-2026-07-14' },
      { label: 'R-041 (Risk register)', href: '#' },
      { label: 'GOV-402 (Recovery plan)', href: 'actions.html' },
      { label: 'Portfolio forecast · 06:15', href: '#' },
      { label: 'PaymentGate correlation', href: 'correlation.html' }
    ],
    followUpIds: ['paymentgate-actions','slipping-actions','top-3-cio'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1620, tokensIn: 728, tokensOut: 421, confidence: 'A' }
  },

  'slipping-actions': {
    id: 'slipping-actions',
    category: 'Programme & Delivery',
    question: 'Which SteerCo actions are at risk of slipping?',
    answerHtml: `
      <p>The Portfolio Agent's 06:15 forecast identifies <strong>3 SteerCo actions</strong> at material risk of slipping their due dates:</p>
      <div class="mt-3 space-y-2">
        <div class="bg-red-50 border border-red-200 rounded p-2 text-sm">
          <div class="flex items-center justify-between">
            <strong><code class="font-mono">GOV-402</code> · Payments Modernisation recovery plan</strong>
            <span class="text-red-700 font-semibold">78% slip probability</span>
          </div>
          <div class="text-xs text-slate-600 mt-0.5">Vikram Patel · due 25 Jul · <em>drivers:</em> vendor negotiation not concluded, resource pull to war-room</div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded p-2 text-sm">
          <div class="flex items-center justify-between">
            <strong><code class="font-mono">GOV-403</code> · DORA Q3 funding release (£1.2M)</strong>
            <span class="text-amber-700 font-semibold">62% slip probability</span>
          </div>
          <div class="text-xs text-slate-600 mt-0.5">Fiona Delacroix · due 21 Jul · <em>drivers:</em> CFO calendar booked, cross-BU allocation TBC</div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded p-2 text-sm">
          <div class="flex items-center justify-between">
            <strong><code class="font-mono">RSK-201</code> · Third-party concentration plan</strong>
            <span class="text-amber-700 font-semibold">55% slip probability</span>
          </div>
          <div class="text-xs text-slate-600 mt-0.5">Marcus Bell · due 31 Jul · <em>drivers:</em> waiting on vendor register from Priya, model methodology dispute</div>
        </div>
      </div>
      <p class="mt-3">The Jira Admin Agent has queued proactive T-3 reminders in Teams for tomorrow 09:15. A one-line CIO email to Vikram and Fiona today would likely reduce both top probabilities materially.</p>
    `,
    citations: [
      { label: 'Portfolio Agent forecast · 06:15', href: '#' },
      { label: 'GOV-402', href: 'actions.html' },
      { label: 'GOV-403', href: 'actions.html' },
      { label: 'Reminders queue', href: 'actions.html' }
    ],
    followUpIds: ['top-3-cio','payments-red','dora-status'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1090, tokensIn: 512, tokensOut: 342, confidence: 'A' }
  },

  /* ============ REGULATORY & RISK ============ */

  'dora-status': {
    id: 'dora-status',
    category: 'Regulatory & Risk',
    question: "What's the status of DORA readiness?",
    answerHtml: `
      <p>Overall DORA readiness is at <strong>82%</strong> (down from 86% two weeks ago). The four workstreams:</p>
      <ul class="mt-3 space-y-1.5 text-sm">
        <li>• <strong>CIF mapping</strong> — was the primary gap. Now closed. Architecture accepted ownership at ARB 9 Jul (D-ARB-4). Priya's proposal due 18 Jul (<code class="font-mono">GOV-383</code>). Elena Rivera closes at 25 Jul (<code class="font-mono">EAG-126</code>).</li>
        <li>• <strong>Event logging</strong> — Payments streaming exception granted at ARB 9 Jul with 30 Sep expiry (D-ARB-1). Target-state design due at 30 Jul ARB (<code class="font-mono">EAG-123</code>). Vendor lock-in noted as R-NEW-2.</li>
        <li>• <strong>Third-party register</strong> — 91% complete; 8 boutique providers remain. Priya Deshmukh owns closure.</li>
        <li>• <strong>Funding</strong> — £1.2M Q3 uplift approved at SteerCo 14 Jul (D-STE-3). Fiona Delacroix to release by 21 Jul (<code class="font-mono">GOV-403</code>).</li>
      </ul>
      <p class="mt-3">Regulatory deadline: <strong>30 September 2026</strong>. Current trajectory forecasts completion by <strong>26 Sep with 92% confidence</strong> — headroom is thin. The Correlation Agent has 8 tickets across 4 forums working on DORA in parallel; all are now cross-linked.</p>
    `,
    citations: [
      { label: 'ARB · 9 Jul', href: 'meeting.html?id=arb-2026-07-09' },
      { label: 'Risk MANCO · 10 Jul', href: 'meeting.html?id=risk-manco-2026-07-10' },
      { label: 'SteerCo · 14 Jul', href: 'meeting.html?id=steerco-2026-07-14' },
      { label: 'DORA correlation loop', href: 'correlation.html' },
      { label: 'Confluence · DORA dashboard', href: '#' }
    ],
    followUpIds: ['draft-manco-paper-dora','silent-risks','slipping-actions'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1350, tokensIn: 692, tokensOut: 384, confidence: 'A' }
  },

  'who-owns-concentration': {
    id: 'who-owns-concentration',
    category: 'Regulatory & Risk',
    question: 'Who owns the third-party concentration risk?',
    answerHtml: `
      <p><strong>Marcus Bell (CRO Delegate)</strong> owns Risk <code class="font-mono">R-NEW-3</code> (Third-party concentration), formally added to the register at Risk MANCO on 10 July.</p>
      <p class="mt-3">Three sub-actions sit under Marcus:</p>
      <ul class="text-sm ml-4 mt-1 space-y-1">
        <li>• <code class="font-mono">RSK-201</code> · Commission risk-treatment plan (payments, cloud, identity) — due 31 Jul</li>
        <li>• <code class="font-mono">STE-A8</code> · Receive risk-treatment plan (SteerCo tracking) — due 31 Jul</li>
        <li>• <code class="font-mono">GOV-390</code> · Provide CRO urgent view (from Fiona's 12 Jul email) — <strong class="text-red-700">OVERDUE 3 days</strong></li>
      </ul>
      <p class="mt-3">Contributing owners: Priya Deshmukh (payments), Ahmed Khan (cloud), Anita Rees (identity). SteerCo endorsed the escalation on 14 July.</p>
      <p class="mt-2 text-slate-600 text-xs"><em>Note:</em> Marcus is currently carrying 4 open concentration-related actions across 3 forums — the highest concentration in your senior team this week.</p>
    `,
    citations: [
      { label: 'Risk MANCO · 10 Jul · item 2', href: 'meeting.html?id=risk-manco-2026-07-10' },
      { label: 'SteerCo · 14 Jul · item 2', href: 'meeting.html?id=steerco-2026-07-14' },
      { label: 'GOV-390 (email source)', href: 'actions.html' }
    ],
    followUpIds: ['paymentgate-actions','emerging-risks','slipping-actions'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 890, tokensIn: 388, tokensOut: 224, confidence: 'A' }
  },

  'emerging-risks': {
    id: 'emerging-risks',
    category: 'Regulatory & Risk',
    question: 'What emerging risks have appeared in the last 30 days?',
    answerHtml: `
      <p>The Audit &amp; Risk Agent has identified <strong>7 emerging risks</strong> in the last 30 days. Four have been formally added to the GRC register; three are pending Risk MANCO ratification.</p>
      <p class="mt-3"><strong>Ratified (in Archer):</strong></p>
      <ul class="text-sm ml-4 mt-1 space-y-0.5">
        <li>• <code class="font-mono">R-NEW-2</code> Payments event-streaming vendor lock-in — Medium (ARB 9 Jul)</li>
        <li>• <code class="font-mono">R-NEW-3</code> Third-party concentration — <strong class="text-red-700">Critical</strong> (Risk MANCO 10 Jul)</li>
        <li>• <code class="font-mono">R-NEW-4</code> FY26 cloud budget breach — High (Risk MANCO 10 Jul)</li>
        <li>• <code class="font-mono">R-NEW-7</code> Merchant availability SLA — Medium (Service MANCO 11 Jul)</li>
      </ul>
      <p class="mt-3"><strong>Pending ratification (draft, in Jira RSK project):</strong></p>
      <ul class="text-sm ml-4 mt-1 space-y-0.5">
        <li>• <code class="font-mono">R-NEW-5</code> FY27 investment prioritisation gap — Medium (Risk MANCO horizon-scan)</li>
        <li>• <code class="font-mono">R-NEW-8</code> Wealth Digital cyber sign-off dependency — Medium <em>(silent risk detected)</em></li>
        <li>• <code class="font-mono">R-NEW-9</code> Merchant reputational exposure — Medium <em>(silent risk detected)</em></li>
      </ul>
      <p class="mt-3">One risk was <strong>uplifted</strong>: R-041 (PaymentGate SLA) High → Critical, ratified at SteerCo 14 Jul.</p>
    `,
    citations: [
      { label: 'Risk MANCO · 10 Jul', href: 'meeting.html?id=risk-manco-2026-07-10' },
      { label: 'ARB · 9 Jul', href: 'meeting.html?id=arb-2026-07-09' },
      { label: 'Service MANCO · 11 Jul', href: 'meeting.html?id=service-manco-2026-07-11' },
      { label: 'Silent risks (Correlation)', href: 'correlation.html' }
    ],
    followUpIds: ['who-owns-concentration','silent-risks','dora-status'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1110, tokensIn: 486, tokensOut: 358, confidence: 'A' }
  },

  /* ============ CLOUD & COST ============ */

  'cloud-variance': {
    id: 'cloud-variance',
    category: 'Cloud & Cost',
    question: 'How much cloud spend variance are we carrying?',
    answerHtml: `
      <p>FY26 cloud spend is running at <strong>+3.4% forecast variance</strong> (£26.9M forecast vs £26.0M plan) — approximately <strong>£900k over</strong> for the year.</p>
      <p class="mt-3"><strong>Position this month</strong></p>
      <ul class="text-sm ml-4 mt-1 space-y-0.5">
        <li>• MTD actual: £2.14M vs plan £2.02M (+6% MTD)</li>
        <li>• FY26 breach probability: 74% (Cloud Optimization Agent)</li>
        <li>• Top three cost centres over plan: Payments (+£340k), Data Platform (+£180k), Contact Centre (+£95k)</li>
      </ul>
      <p class="mt-3"><strong>What's already happening</strong></p>
      <ul class="text-sm ml-4 mt-1 space-y-0.5">
        <li>• SteerCo <strong>accepted</strong> FY26 variance on 14 Jul (D-STE-4).</li>
        <li>• FY27 controls proposal (<code class="font-mono">FIN-142</code>) due 31 Jul — commit strategy + non-prod scheduling + unit economics.</li>
        <li>• Cloud Optimization Agent has identified <strong>£340k/yr in immediate savings</strong> (7 rightsizing opportunities, non-prod scheduling, one storage tier). Draft tickets queued for owner approval.</li>
        <li>• GOV-403 (£1.2M DORA uplift) has been separately funded — <em>does not</em> compound this variance.</li>
      </ul>
      <p class="mt-3 text-slate-600 text-xs"><em>Recommendation:</em> approve the 7 rightsizing tickets today for a fast £340k saving. Ahmed Khan has the FY27 paper on track for 31 Jul.</p>
    `,
    citations: [
      { label: 'SteerCo · 14 Jul · item 4', href: 'meeting.html?id=steerco-2026-07-14' },
      { label: 'Risk MANCO · 10 Jul · item 4', href: 'meeting.html?id=risk-manco-2026-07-10' },
      { label: 'FIN-142 (FY27 controls)', href: 'actions.html' },
      { label: 'Cloud Optimization Agent · 05:50', href: '#' }
    ],
    followUpIds: ['savings-opportunities','top-3-cio','slipping-actions'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1240, tokensIn: 542, tokensOut: 396, confidence: 'A' }
  },

  'savings-opportunities': {
    id: 'savings-opportunities',
    category: 'Cloud & Cost',
    question: "Show me this week's savings opportunities",
    answerHtml: `
      <p>Cloud Optimization Agent's sweep at 05:50 today identified <strong>£340k/yr in savings</strong> across 7 opportunities:</p>
      <div class="mt-3 space-y-1.5 text-sm">
        <div class="flex items-center justify-between border-b border-slate-100 py-1"><span>1. Non-prod compute scheduling (Payments + Wealth) · <em>Owner: Payments platform</em></span><span class="font-semibold text-green-700 tt-num-mono">£180k</span></div>
        <div class="flex items-center justify-between border-b border-slate-100 py-1"><span>2. Rightsize Contact Centre stateless services (m5.2xl → c6.large) · <em>Emma Foster</em></span><span class="font-semibold text-green-700 tt-num-mono">£62k</span></div>
        <div class="flex items-center justify-between border-b border-slate-100 py-1"><span>3. S3 Intelligent-Tiering for archived audit evidence · <em>Angela Rossi</em></span><span class="font-semibold text-green-700 tt-num-mono">£38k</span></div>
        <div class="flex items-center justify-between border-b border-slate-100 py-1"><span>4. RDS reserved-instance renewal (data platform) · <em>Rachel Martin</em></span><span class="font-semibold text-green-700 tt-num-mono">£28k</span></div>
        <div class="flex items-center justify-between border-b border-slate-100 py-1"><span>5. Snapshot lifecycle policy (dev/test) · <em>Cloud platform</em></span><span class="font-semibold text-green-700 tt-num-mono">£18k</span></div>
        <div class="flex items-center justify-between border-b border-slate-100 py-1"><span>6. Data-transfer optimisation (Wealth micro-services) · <em>Chris Bergman</em></span><span class="font-semibold text-green-700 tt-num-mono">£8k</span></div>
        <div class="flex items-center justify-between py-1"><span>7. Load balancer consolidation (Contact Centre) · <em>Cloud platform</em></span><span class="font-semibold text-green-700 tt-num-mono">£6k</span></div>
      </div>
      <p class="mt-3">Draft tickets already queued in Jira FIN project. Ownership resolved via CMDB. One-click "Approve all" would send Teams cards to 7 owners and schedule change windows.</p>
    `,
    citations: [
      { label: 'Cloud Optimization Agent · 05:50', href: '#' },
      { label: 'Cockpit · Cloud panel', href: 'index.html' }
    ],
    followUpIds: ['cloud-variance','top-3-cio'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1080, tokensIn: 428, tokensOut: 402, confidence: 'A' }
  },

  /* ============ EXECUTIVE BRIEF ============ */

  'top-3-cio': {
    id: 'top-3-cio',
    category: 'Executive Brief',
    question: 'What are the top 3 things I should focus on this week as CIO?',
    answerHtml: `
      <p>Based on this week's health scores, open decisions and Correlation Agent findings:</p>

      <p class="mt-3"><strong>1. PaymentGate contract review (<code class="font-mono">GOV-401</code>) — due Tue 21 Jul</strong></p>
      <p class="text-sm text-slate-700 mt-1">This is the highest-value item on your desk. Legal has drafted the exit-clause preparation memo; Procurement's counter-proposal lands Wednesday. Slip probability <strong>55%</strong>. Protect this with a Monday 09:30 sync (you + Legal + Procurement). If this slips past Friday, the Recovery Plan (<code class="font-mono">GOV-402</code>, due 25 Jul) is compromised.</p>

      <p class="mt-3"><strong>2. DORA Q3 funding release (<code class="font-mono">GOV-403</code>) — due Tue 21 Jul</strong></p>
      <p class="text-sm text-slate-700 mt-1">£1.2M approved at SteerCo; Fiona has it, but slip probability <strong>62%</strong> per Portfolio Agent (Fiona's calendar is booked solid). A one-line email from you today would remove the friction.</p>

      <p class="mt-3"><strong>3. FY27 investment portfolio kick-off (<code class="font-mono">PMO-501</code>)</strong></p>
      <p class="text-sm text-slate-700 mt-1">Not urgent this week but strategically the most important item. Priya Kapoor co-ordinates to 15 Aug. A 30-min block with her before Wed to align on prioritisation criteria unlocks the whole pipeline. The Board ask on AI/DORA (<code class="font-mono">GOV-391</code>) folds in here.</p>

      <p class="mt-3 text-xs text-slate-600"><em>Also on your radar:</em> 3 overdue actions from prior forums need reassigning after A. Novak's departure — see Recommendation 4 in your Cockpit.</p>
    `,
    citations: [
      { label: 'Cockpit · 20 Jul 07:00', href: 'index.html' },
      { label: 'Portfolio Agent · 06:15', href: '#' },
      { label: 'Reminders · 09:00', href: 'actions.html' },
      { label: 'Recommendations', href: 'index.html' }
    ],
    followUpIds: ['payments-red','dora-status','slipping-actions'],
    meta: { model: 'Llama 3.3 70B · Claude 3.5 verifier', latencyMs: 2410, tokensIn: 1240, tokensOut: 588, confidence: 'A' }
  },

  'draft-manco-paper-dora': {
    id: 'draft-manco-paper-dora',
    category: 'Executive Brief',
    question: 'Draft me a MANCO paper on DORA readiness',
    answerHtml: `
      <p class="text-slate-600 italic text-xs mb-2">Draft below — edit before I circulate. Say "yes, publish" to send to SharePoint /sites/gov-manco/Papers/ and add to the next MANCO agenda pack.</p>
      <div class="border border-slate-200 bg-white rounded p-3 text-sm">
        <p class="text-center font-bold">MANCO Paper · DORA Readiness — Q3 Update</p>
        <p class="text-xs text-slate-500 text-center">Author: Executive Reporting Agent · Reviewed: [awaiting HITL] · Date: 20 July 2026</p>

        <p class="mt-3"><strong>1. Position</strong></p>
        <p>DORA overall readiness stands at 82% (down from 86%). The Article 30 CIF mapping ownership gap identified at ARB on 9 July is now closed. The Payments event-streaming exception was granted with 30 Sep expiry. The regulatory deadline of 30 September 2026 remains achievable — forecast 26 Sep with 92% confidence — but headroom is thin.</p>

        <p class="mt-2"><strong>2. Progress since last MANCO</strong></p>
        <ul class="ml-4 space-y-0.5">
          <li>• CIF mapping ownership resolved (Architecture, ARB 9 Jul, D-ARB-4).</li>
          <li>• SteerCo approved £1.2M Q3 uplift funding (14 Jul, D-STE-3).</li>
          <li>• Third-party register at 91% (up from 84%); 8 boutique providers to close.</li>
          <li>• Correlation Agent tracking 8 DORA-linked tickets across 4 forums; all cross-linked.</li>
        </ul>

        <p class="mt-2"><strong>3. Risks</strong></p>
        <ul class="ml-4 space-y-0.5">
          <li>• R-014 (DORA readiness) — High; funding approved but resource allocation still to confirm.</li>
          <li>• R-NEW-2 (event-streaming vendor lock-in) — Medium (new).</li>
          <li>• GOV-403 (funding release by 21 Jul) — Portfolio Agent forecasts 62% slip probability.</li>
        </ul>

        <p class="mt-2"><strong>4. Asks of MANCO</strong></p>
        <ul class="ml-4 space-y-0.5">
          <li>• Endorse the £1.2M uplift split (programme 55% / cyber 30% / legal 15%).</li>
          <li>• Confirm accountability: Rossi (SME), Kapoor (delivery), Whitmore (evidence).</li>
          <li>• Note target-state event-streaming design due 30 Jul ARB.</li>
        </ul>

        <p class="mt-2"><strong>5. Next update</strong>: 17 August MANCO.</p>
      </div>
    `,
    citations: [
      { label: 'ARB · 9 Jul', href: 'meeting.html?id=arb-2026-07-09' },
      { label: 'Risk MANCO · 10 Jul', href: 'meeting.html?id=risk-manco-2026-07-10' },
      { label: 'SteerCo · 14 Jul', href: 'meeting.html?id=steerco-2026-07-14' },
      { label: 'DORA readiness live', href: '#' }
    ],
    followUpIds: ['dora-status','emerging-risks','top-3-cio'],
    meta: { model: 'Claude 3.5 Sonnet (executive narrative)', latencyMs: 3210, tokensIn: 1580, tokensOut: 812, confidence: 'A' }
  },

  /* ============ RECALL ============ */

  'steerco-decided-payments': {
    id: 'steerco-decided-payments',
    category: 'Recall',
    question: 'What did SteerCo decide about the Payments programme?',
    answerHtml: `
      <p>SteerCo on 14 July made <strong>two decisions</strong> on Payments Modernisation:</p>
      <div class="mt-3 bg-amber-50 border border-amber-200 rounded p-3 text-sm">
        <div class="font-semibold text-amber-900"><code class="font-mono">D-STE-1</code></div>
        <p class="mt-1">The programme was moved from Amber to <strong>RED</strong> and a recovery plan was mandated within 10 working days. Vikram Patel to submit the recovery plan by 25 July (<code class="font-mono">GOV-402</code>, Critical). Recovery plan must address the 3-week schedule slip, £2.1M budget overrun, and PaymentGate concentration.</p>
      </div>
      <div class="mt-2 bg-amber-50 border border-amber-200 rounded p-3 text-sm">
        <div class="font-semibold text-amber-900"><code class="font-mono">D-STE-2</code></div>
        <p class="mt-1">R-041 (PaymentGate SLA) uplift to Critical was <strong>confirmed</strong>. Contract exit-clause preparation was <strong>authorised</strong> via Procurement + Legal. Ravi Chandran (CIO) and Legal own the formal contract review (<code class="font-mono">GOV-401</code>, due 21 July).</p>
      </div>
      <p class="mt-3 text-sm">Payments now sits as a standing SteerCo agenda item until R-041 is downgraded. Vikram publishes daily war-room summaries (<code class="font-mono">GOV-392</code>) until then.</p>
      <p class="mt-2 text-slate-600 text-xs">Cited in the SteerCo minute · items 1–2 · published to SharePoint /sites/gov-steerco/Minutes/2026-07-14. Approved for circulation by Chloe Bennett on 15 Jul.</p>
    `,
    citations: [
      { label: 'SteerCo · 14 Jul · items 1-2', href: 'meeting.html?id=steerco-2026-07-14' },
      { label: 'GOV-401', href: 'actions.html' },
      { label: 'GOV-402', href: 'actions.html' },
      { label: 'R-041', href: '#' }
    ],
    followUpIds: ['payments-red','paymentgate-actions','top-3-cio'],
    meta: { model: 'Llama 3.3 70B', latencyMs: 1010, tokensIn: 462, tokensOut: 312, confidence: 'A' }
  }

};

/* Grouped prompts for the sidebar */
window.PROMPT_GROUPS = [
  { name: 'Themes & Correlation', prompts: [
    { id: 'themes-6-meetings',    label: 'Recurring themes across the last 6 governance meetings' },
    { id: 'paymentgate-actions',  label: 'Every action linked to PaymentGate' },
    { id: 'silent-risks',         label: 'What silent risks have you detected?' }
  ]},
  { name: 'Programme & Delivery', prompts: [
    { id: 'payments-red',         label: 'Why is Payments Modernisation red?' },
    { id: 'slipping-actions',     label: 'Which SteerCo actions are at risk of slipping?' }
  ]},
  { name: 'Regulatory & Risk', prompts: [
    { id: 'dora-status',          label: "What's the status of DORA readiness?" },
    { id: 'who-owns-concentration', label: 'Who owns the third-party concentration risk?' },
    { id: 'emerging-risks',       label: 'Emerging risks in the last 30 days' }
  ]},
  { name: 'Cloud & Cost', prompts: [
    { id: 'cloud-variance',       label: 'How much cloud spend variance are we carrying?' },
    { id: 'savings-opportunities', label: "This week's savings opportunities" }
  ]},
  { name: 'Executive Brief', prompts: [
    { id: 'top-3-cio',            label: 'Top 3 things I should focus on this week' },
    { id: 'draft-manco-paper-dora', label: 'Draft a MANCO paper on DORA readiness' }
  ]},
  { name: 'Recall (past decisions)', prompts: [
    { id: 'steerco-decided-payments', label: 'What did SteerCo decide about Payments?' }
  ]}
];
