/* Technology Management Tower — Shared UI + Alpine Components
   Depends on: Tailwind (CDN), Alpine.js 3 (CDN), Lucide icons (CDN). */

/* ────────────────────────────────────────────────────────────────
   Northwind Technology — fictional company seeded data
   ──────────────────────────────────────────────────────────────── */
window.NORTHWIND = {
  name: "Northwind Technology",
  reportedAt: "Mon 20 Jul 2026 · 07:00 UTC",
  cio: "Ravi Chandran",
  healthScore: 76,
  healthDelta: 3,
  narrative:
    "Delivery held steady; cloud spend is trending 6% above plan; two emerging risks in the Payments programme require SteerCo attention. DORA readiness slipped to 82% following an ARB exception on event-logging.",
  breakdown: [
    { label: "Delivery",     score: 82, delta: +1, color: "green" },
    { label: "Service",      score: 65, delta: -4, color: "amber" },
    { label: "Cloud",        score: 58, delta: +2, color: "amber" },
    { label: "Architecture", score: 80, delta:  0, color: "green" },
    { label: "Risk",         score: 74, delta: -3, color: "amber" },
    { label: "Audit",        score: 88, delta: +4, color: "green" }
  ],
  initiatives: [
    { name: "Payments Modernisation", rag: "red",   pct: 58, forecast: "3 wks late", spend: "62%", benefits: "on plan" },
    { name: "Data Platform",          rag: "green", pct: 74, forecast: "on plan",    spend: "68%", benefits: "ahead" },
    { name: "AI Enablement",          rag: "green", pct: 41, forecast: "on plan",    spend: "38%", benefits: "n/a" },
    { name: "Cloud Landing Zone v2",  rag: "amber", pct: 55, forecast: "1 wk late",  spend: "72%", benefits: "on plan" },
    { name: "DORA Readiness",         rag: "amber", pct: 82, forecast: "at risk",    spend: "80%", benefits: "regulatory" },
    { name: "Wealth Digital",         rag: "green", pct: 88, forecast: "on plan",    spend: "85%", benefits: "on plan" },
    { name: "Core Banking Uplift",    rag: "green", pct: 30, forecast: "on plan",    spend: "22%", benefits: "on plan" },
    { name: "Contact Centre AI",      rag: "green", pct: 66, forecast: "on plan",    spend: "60%", benefits: "ahead" }
  ],
  actions: {
    newThisWeek: 42,
    closedThisWeek: 37,
    overdue: 18,
    overdueDelta: -2,
    pendingDecisions: 6
  },
  risks: [
    { id: "R-041", title: "Vendor SLA – PaymentGate (payments)",  rating: "Critical", from: "High",     movement: "up",   forum: "SteerCo" },
    { id: "R-063", title: "Cloud budget variance FY26",           rating: "High",     from: "Medium",   movement: "up",   forum: "Risk MANCO" },
    { id: "R-014", title: "Regulatory – DORA readiness",          rating: "High",     from: "High",     movement: "flat", forum: "Risk MANCO" },
    { id: "R-072", title: "Key-person – Data engineering",        rating: "High",     from: "High",     movement: "flat", forum: "Service MANCO" },
    { id: "R-055", title: "Third-party breach follow-up",         rating: "Medium",   from: "High",     movement: "down", forum: "Cyber MANCO" }
  ],
  cloud: {
    mtdActual: 2140000,
    mtdPlan:   2020000,
    fyForecast: 26900000,
    fyPlan:     26000000,
    varianceFy: 3.4,
    wasteItems: 7,
    savings: 340000
  },
  audit: {
    openFindings: 12,
    overdueFindings: 2,
    nextAudit: "APRA CPS 234 · Aug 2026",
    evidenceReadiness: 93,
    evidenceReadinessDelta: 4
  },
  recommendations: [
    { id: "rec-1", rank: 1, text: "Escalate PaymentGate vendor SLA to SteerCo — appears in 4 forums, no accountable owner",
      impact: "£2.1M/yr risk exposure", effort: "L", verdict: "recommended" },
    { id: "rec-2", rank: 2, text: "Approve non-prod compute savings plan — Cloud Optimization Agent identified",
      impact: "£180k/yr saved", effort: "S", verdict: "recommended" },
    { id: "rec-3", rank: 3, text: "Convene ARB for DORA event-logging exception — regulatory deadline 30 Sep",
      impact: "Regulatory", effort: "M", verdict: "recommended" },
    { id: "rec-4", rank: 4, text: "Reassign 3 stale MANCO actions from departed owner (A. Novak)",
      impact: "Hygiene", effort: "S", verdict: "recommended" }
  ]
};

/* ────────────────────────────────────────────────────────────────
   Small utilities
   ──────────────────────────────────────────────────────────────── */
window.TT = {
  fmtGBP(n) {
    if (n >= 1e6) return "£" + (n/1e6).toFixed(2) + "M";
    if (n >= 1e3) return "£" + (n/1e3).toFixed(0) + "k";
    return "£" + n.toLocaleString();
  },
  ragClass(rag) {
    return {
      red:   "tt-pill tt-pill-red",
      amber: "tt-pill tt-pill-amber",
      green: "tt-pill tt-pill-green",
      blue:  "tt-pill tt-pill-blue"
    }[rag] || "tt-pill tt-pill-grey";
  },
  ragLabel(rag) {
    return { red: "RED", amber: "AMBER", green: "GREEN", blue: "INFO" }[rag] || rag.toUpperCase();
  },
  deltaArrow(d) {
    if (d > 0) return "▲";
    if (d < 0) return "▼";
    return "=";
  },
  deltaClass(d) {
    if (d > 0) return "tt-delta-up";
    if (d < 0) return "tt-delta-down";
    return "tt-delta-flat";
  },
  qs(key) {
    const p = new URLSearchParams(window.location.search);
    return p.get(key);
  }
};

/* ────────────────────────────────────────────────────────────────
   Top nav (reusable)
   ──────────────────────────────────────────────────────────────── */
window.renderTopNav = function(activeKey) {
  const items = [
    { key: "home",         label: "Cockpit",     href: "index.html"     },
    { key: "meetings",     label: "Meetings",    href: "meetings.html"  },
    { key: "actions",      label: "Actions",     href: "actions.html"   },
    { key: "correlation",  label: "Correlation", href: "correlation.html" },
    { key: "ask",          label: "Ask Tower",   href: "ask.html"       },
    { key: "deck",         label: "Deck",        href: "deck.html"      }
  ];
  const html = `
    <header class="tt-topbar">
      <div class="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-black">T</div>
          <div>
            <div class="text-[15px] font-semibold text-white">Technology Management Tower</div>
            <div class="text-[11px] text-slate-300 -mt-0.5">Northwind Technology · Executive View</div>
          </div>
        </a>
        <nav class="flex items-center gap-6 text-sm">
          ${items.map(i =>
            `<a href="${i.href}" class="${activeKey === i.key ? 'active' : ''}">${i.label}</a>`
          ).join('')}
        </nav>
        <div class="flex items-center gap-3">
          <div class="text-right leading-tight">
            <div class="text-[13px] text-white font-medium">${window.NORTHWIND.cio}</div>
            <div class="text-[10px] text-slate-300">Chief Information Officer</div>
          </div>
          <div class="w-9 h-9 rounded-full bg-slate-500 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-teal-400/40">RC</div>
        </div>
      </div>
    </header>
  `;
  document.getElementById('tt-topbar-mount').innerHTML = html;
};

/* ────────────────────────────────────────────────────────────────
   Typewriter effect (used in agent processing + Ask-the-Tower)
   ──────────────────────────────────────────────────────────────── */
window.typewriter = function(element, text, opts = {}) {
  const { speed = 12, onDone } = opts;
  return new Promise(resolve => {
    element.textContent = "";
    const cursor = document.createElement('span');
    cursor.className = 'tt-cursor';
    element.appendChild(cursor);
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        cursor.insertAdjacentText('beforebegin', text.charAt(i));
        i++;
        setTimeout(tick, speed);
      } else {
        cursor.remove();
        if (onDone) onDone();
        resolve();
      }
    };
    tick();
  });
};

/* ────────────────────────────────────────────────────────────────
   Load Lucide icons after DOM ready
   ──────────────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();
});
