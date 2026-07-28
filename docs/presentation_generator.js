// Bottom of the Barrel Bank — 2026 GSBC Annual Shareholder Presentation (rev 2)
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const Q = JSON.parse(fs.readFileSync("quarters.json", "utf8"));

const QTRS = ["Q4/28","Q1/29","Q2/29","Q3/29","Q4/29","Q1/30","Q2/30","Q3/30","Q4/30"];
const SIMQ = QTRS.slice(1);
const g = (q, b, s, k) => { const v = Q[q]?.[b]?.[s]?.[k]; return (v === undefined || v === null) ? null : v; };
const series = (b, s, k, qs) => (qs || QTRS).map(q => g(q, b, s, k));

const NAVY = "1F2A44", NAVY_D = "141C31", GOLD = "E3A94E", AMBER = "B9791F",
      CREAM = "F5F0E4", INK = "232733", MUT = "6E7480", GRID = "E4E0D5",
      GOOD = "2E7D32", BAD = "B3402E", WHITE = "FFFFFF";
const HEAD = "Cambria", BODY = "Calibri";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";

function darkSlide() { const s = pres.addSlide(); s.background = { color: NAVY_D }; return s; }
function lightSlide(title, kicker) {
  const s = pres.addSlide(); s.background = { color: WHITE };
  if (kicker) s.addText(kicker.toUpperCase(), { x: 0.6, y: 0.32, w: 11.5, h: 0.32, fontFace: BODY, fontSize: 12, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.58, w: 12.1, h: 0.75, fontFace: HEAD, fontSize: 32, bold: true, color: NAVY, margin: 0 });
  return s;
}
function tile(s, x, y, w, h, big, small, opts = {}) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: opts.bg || CREAM }, line: { type: "none" } });
  s.addText(big, { x: x + 0.18, y: y + 0.12, w: w - 0.36, h: h * 0.5, fontFace: HEAD, fontSize: opts.bigSize || 28, bold: true, color: opts.color || NAVY, margin: 0, valign: "bottom" });
  s.addText(small, { x: x + 0.18, y: y + h * 0.56, w: w - 0.36, h: h * 0.4, fontFace: BODY, fontSize: opts.smallSize || 11, color: opts.sub || MUT, margin: 0, valign: "top" });
}
function chartBase(extra = {}) {
  return Object.assign({
    fontFace: BODY,
    catAxisLabelColor: MUT, catAxisLabelFontSize: 10, valAxisLabelColor: MUT, valAxisLabelFontSize: 10,
    valGridLine: { color: GRID, size: 0.5 }, catGridLine: { style: "none" },
    chartColors: [GOLD], showLegend: false, showTitle: false,
    catAxisLineColor: "C9C4B7", valAxisLineShow: false,
  }, extra);
}

// ============ 1. TITLE ============
{
  const s = darkSlide();
  s.addImage({ path: "bottle.jpg", x: 9.05, y: 0.75, w: 3.62, h: 5.43 });
  s.addText("BOTTOM OF THE BARREL BANK", { x: 0.75, y: 1.7, w: 8.1, h: 0.5, fontFace: BODY, fontSize: 16, bold: true, color: GOLD, charSpacing: 3, margin: 0 });
  s.addText("Aged to Top Shelf.", { x: 0.75, y: 2.25, w: 8.2, h: 1.2, fontFace: HEAD, fontSize: 54, bold: true, color: WHITE, margin: 0 });
  s.addText("2026 Annual Shareholder Presentation", { x: 0.75, y: 3.85, w: 8.1, h: 0.4, fontFace: BODY, fontSize: 15, color: "C9CFDC", margin: 0 });
  s.addText("Team B1  ·  Fiscal Years 2029–2030  ·  Graduate School of Banking at Colorado", { x: 0.75, y: 4.28, w: 8.1, h: 0.4, fontFace: BODY, fontSize: 13, color: "C9CFDC", margin: 0 });
  s.addText([
    { text: "$41.36", options: { bold: true, color: GOLD } }, { text: "  share price   ·   ", options: { color: "C9CFDC" } },
    { text: "A", options: { bold: true, color: GOLD } }, { text: "  credit rating   ·   ", options: { color: "C9CFDC" } },
    { text: "$6.7M", options: { bold: true, color: GOLD } }, { text: "  2030 net income", options: { color: "C9CFDC" } },
  ], { x: 0.75, y: 5.7, w: 8.2, h: 0.5, fontFace: BODY, fontSize: 15, margin: 0 });
  s.addNotes("Opening (CEO, 1 min): Two years ago this bank earned its name. Tonight we hand shareholders an A-rated bank, a growing dividend, and record earnings. This is how we aged it to top shelf.");
}

// ============ 2. IDENTITY ============
{
  const s = lightSlide("Who We Are", "Identity · Vision, Mission & Core Values");
  s.addText("VISION", { x: 0.6, y: 1.7, w: 2.0, h: 0.35, fontFace: BODY, fontSize: 12, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
  s.addText("To build a bank like a great bourbon: crafted with purpose, strengthened over time, and built to endure.", { x: 0.6, y: 2.05, w: 7.9, h: 0.85, fontFace: HEAD, fontSize: 17, italic: true, color: INK, margin: 0 });
  s.addText("MISSION", { x: 0.6, y: 3.1, w: 2.0, h: 0.35, fontFace: BODY, fontSize: 12, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
  s.addText("Slow-aged investment, distilled from trust, poured back into the community.", { x: 0.6, y: 3.45, w: 7.9, h: 0.7, fontFace: HEAD, fontSize: 17, italic: true, color: INK, margin: 0 });
  s.addText("CORE VALUES", { x: 0.6, y: 4.5, w: 3.0, h: 0.35, fontFace: BODY, fontSize: 12, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
  const vals = [
    ["Integrity", "We report the hard numbers as plainly as the good ones."],
    ["Stewardship", "Shareholder capital is borrowed trust — we spend it carefully."],
    ["Excellence", "Priced right, funded right, reserved right — every quarter."],
    ["Relationships", "Depositors and borrowers chose us; we earn that choice daily."],
  ];
  let x = 0.6;
  vals.forEach(([h, t]) => {
    s.addShape("roundRect", { x, y: 4.9, w: 2.9, h: 1.85, rectRadius: 0.08, fill: { color: CREAM }, line: { type: "none" } });
    s.addText(h, { x: x + 0.2, y: 5.08, w: 2.5, h: 0.4, fontFace: HEAD, fontSize: 16, bold: true, color: NAVY, margin: 0 });
    s.addText(t, { x: x + 0.2, y: 5.5, w: 2.5, h: 1.1, fontFace: BODY, fontSize: 10.5, color: MUT, margin: 0 });
    x += 3.07;
  });
  s.addImage({ path: "bottle.jpg", x: 9.55, y: 1.55, w: 1.85, h: 2.78 });
  s.addNotes("CEO (40 sec): Vision and mission set the pace — slow, deliberate, durable. The four core values — Integrity, Stewardship, Excellence, Relationships — show up in this deck as honest scorecards, careful capital, disciplined pricing, and a funding base built on customers rather than borrowings.");
}

// ============ 3. AGENDA & TEAM ============
{
  const s = lightSlide("Agenda & Presenters", "15 minutes · 5 minutes Q&A · every member presents");
  const rows = [
    ["1", "The Bank We Inherited", "[CEO — name]", "2 min"],
    ["2", "Strategy — Growth, Balance Sheet, Products", "[KS — Lending & Credit]", "4 min"],
    ["3", "Operating Results, FY29 & FY30", "[CU — Treasury & CFO]", "4 min"],
    ["4", "Goals & Regulatory Compliance", "[AY — Credit Administration]", "3 min"],
    ["5", "KPIs & the Road Ahead", "[JS — Deposits & Strategy]", "2 min"],
  ];
  let y = 1.85;
  rows.forEach(([n, t, who, mins]) => {
    s.addShape("ellipse", { x: 0.65, y: y + 0.08, w: 0.5, h: 0.5, fill: { color: NAVY }, line: { type: "none" } });
    s.addText(n, { x: 0.65, y: y + 0.08, w: 0.5, h: 0.5, align: "center", fontFace: HEAD, fontSize: 16, bold: true, color: GOLD, margin: 0 });
    s.addText(t, { x: 1.4, y, w: 6.9, h: 0.65, fontFace: BODY, fontSize: 17, bold: true, color: INK, margin: 0, valign: "middle" });
    s.addText(who, { x: 8.4, y, w: 3.2, h: 0.65, fontFace: BODY, fontSize: 14, color: MUT, margin: 0, valign: "middle" });
    s.addText(mins, { x: 11.65, y, w: 1.05, h: 0.65, fontFace: BODY, fontSize: 14, bold: true, color: AMBER, margin: 0, valign: "middle", align: "right" });
    y += 0.95;
  });
  s.addNotes("CEO (20 sec): One line per person. Swap bracketed names before presenting.");
}

// ============ 4. INHERITED ============
{
  const s = lightSlide("The Bank We Inherited", "January 2029 · Section 1");
  s.addImage({ path: "lemmings.png", x: 8.75, y: 1.7, w: 4.0, h: 4.0, sizing: { type: "cover", w: 4.0, h: 4.0 } });
  s.addText("Prior management’s strategy, illustrated.", { x: 8.75, y: 5.85, w: 4.0, h: 0.3, align: "center", fontFace: BODY, fontSize: 11, italic: true, color: MUT, margin: 0 });
  const t = [
    ["−$0.5M", "quarterly operating loss, worsening"],
    ["187%", "fed funds purchased vs equity — the limit is 100%"],
    ["8.64%", "risk capital vs a 10% rule due in 8 quarters"],
    ["C", "credit rating — wholesale funding nearly shut"],
  ];
  let i = 0;
  for (const [big, small] of t) {
    const x = 0.6 + (i % 2) * 4.05, y = 1.8 + Math.floor(i / 2) * 2.0;
    tile(s, x, y, 3.85, 1.75, big, small, { bigSize: 30, color: BAD, smallSize: 12 });
    i++;
  }
  s.addText("A dividend the earnings couldn’t cover, an under-funded loss reserve, and a plan that was mostly momentum.", { x: 0.6, y: 6.15, w: 7.9, h: 0.6, fontFace: BODY, fontSize: 13, italic: true, color: MUT, margin: 0 });
  s.addNotes("CEO (2 min): Set the scene honestly — the name was earned. Four numbers tell it: losing money, funding on overnight borrowings far past the regulatory line, capital short of a hard new requirement, and a C rating. First team decision: stop following the lemmings.");
}

// ============ 5. OUR JOURNEY ============
{
  const s = lightSlide("Our Two-Year Journey", "Share price, quarter by quarter");
  s.addChart(pres.ChartType.line, [
    { name: "Share price", labels: QTRS, values: series("bank1", "capital", "stock_price") },
  ], chartBase({
    x: 0.6, y: 1.7, w: 8.6, h: 5.1,
    chartColors: [GOLD], lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 7,
    valAxisMinVal: 20, valAxisMaxVal: 50, valAxisMajorUnit: 10,
    showValue: false,
  }));
  tile(s, 9.5, 1.7, 3.2, 1.5, "$22.97", "the low — Q2/29. We told you the plan; we kept to it.", { color: BAD, smallSize: 11 });
  tile(s, 9.5, 3.35, 3.2, 1.5, "$47.41", "the peak — Q3/30, our record quarter", { color: GOOD, smallSize: 11 });
  tile(s, 9.5, 5.0, 3.2, 1.5, "$41.36", "year-end 2030 — above where we started, with a dividend again", { smallSize: 11 });
  s.addNotes("KS (30 sec): The dip was the investment; everything after Q2/29 is the return on it. From here, the how.");
}

// ============ 6. STRATEGY — THE RECIPE ============
{
  const s = lightSlide("The Recipe — Three Phases", "Section 2 · Strategy");
  const phases = [
    ["1 · THE MASH", "H1 2029 — Stabilize", [
      "Converted emergency borrowings into core deposits",
      "Raised $12M of common equity early",
      "Suspended the dividend — painful, honest",
    ]],
    ["2 · THE BARREL", "H2 2029 — Reprice & Reserve", [
      "Repriced the loan book +100 to +300bp",
      "Exited money-losing consumer products",
      "Pre-funded credit; finished the capital plan",
    ]],
    ["3 · THE POUR", "FY 2030 — Harvest", [
      "Variable funding rode rates down into margin",
      "Restarted the dividend: $0.25 → $0.50",
      "De-risked construction as the cycle aged",
    ]],
  ];
  let x = 0.6;
  phases.forEach(([h, sub, items]) => {
    s.addShape("roundRect", { x, y: 1.75, w: 4.0, h: 4.6, rectRadius: 0.09, fill: { color: CREAM }, line: { type: "none" } });
    s.addText(h, { x: x + 0.25, y: 2.0, w: 3.5, h: 0.4, fontFace: BODY, fontSize: 14, bold: true, color: AMBER, charSpacing: 1.5, margin: 0 });
    s.addText(sub, { x: x + 0.25, y: 2.42, w: 3.5, h: 0.45, fontFace: HEAD, fontSize: 16, bold: true, color: NAVY, margin: 0 });
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: { code: "2022", indent: 10 }, breakLine: i < items.length - 1, paraSpaceAfter: 10 } })),
      { x: x + 0.25, y: 3.05, w: 3.55, h: 3.1, fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top" });
    x += 4.22;
  });
  s.addText("Sequence was the strategy: stabilize before you reprice, reprice before you harvest.", { x: 0.6, y: 6.65, w: 12.1, h: 0.4, fontFace: HEAD, fontSize: 14, italic: true, color: NAVY, margin: 0, align: "center" });
  s.addNotes("KS (90 sec): One phase per column, one breath each. The through-line: you cannot reprice loans while your funding is on fire, and you cannot harvest a margin you never repriced.");
}

// ============ 7. GROWTH & BALANCE SHEET STRATEGY ============
{
  const s = lightSlide("Growth & Balance Sheet Strategy", "How we grew, how we funded it");
  const left = [
    ["Growth: organic first, M&A-ready next", "These two years we grew by winning customers — pricing, fees, service. Assets $740M → $818M. That discipline built the balance sheet an acquirer needs."],
    ["Capital raised early and cheap", "$18M common + $5M subordinated notes, raised before prices fell further. Philosophy: hold a buffer above every requirement."],
    ["Funding model: core first", "Core deposits fund ~99% of the book; wholesale borrowings retired to near zero. Deposits $551M → $658M."],
  ];
  let y = 1.7;
  left.forEach(([h, t]) => {
    s.addText(h, { x: 0.6, y, w: 5.6, h: 0.35, fontFace: BODY, fontSize: 15, bold: true, color: NAVY, margin: 0 });
    s.addText(t, { x: 0.6, y: y + 0.4, w: 5.6, h: 1.1, fontFace: BODY, fontSize: 12, color: INK, margin: 0 });
    y += 1.72;
  });
  s.addChart(pres.ChartType.bar, [
    { name: "Start (Q4/28)", labels: ["Assets", "Loans", "Deposits", "Capital"], values: [739.8, 588.0, 551.1, 47.0] },
    { name: "Finish (Q4/30)", labels: ["Assets", "Loans", "Deposits", "Capital"], values: [818.1, 663.2, 658.0, 80.0] },
  ], chartBase({
    x: 6.6, y: 1.7, w: 6.1, h: 5.0, chartColors: ["C9C4B7", GOLD],
    showLegend: true, legendPos: "b", legendColor: MUT, legendFontSize: 11,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: MUT, dataLabelFontSize: 9.5,
    barGapWidthPct: 80, valAxisMaxVal: 900,
  }));
  s.addText("$M · capital = equity + subordinated notes", { x: 6.6, y: 6.75, w: 6.1, h: 0.3, fontFace: BODY, fontSize: 10, italic: true, color: MUT, margin: 0, align: "center" });
  s.addNotes("KS (60 sec): Growth strategy per the framework — organic, deposit-funded, capital raised ahead of need. The chart: bigger on every line that matters, and the growth is funded by customers, not borrowings.");
}

// ============ 8. PRODUCTS & CAPABILITIES ============
{
  const s = lightSlide("Products & Capabilities", "What we offer — and what we stopped offering");
  const cols = [
    ["WHERE WE LEAD", GOOD, [
      "Commercial & construction lending — priced for risk, reviewed every cycle",
      "Full deposit suite — top-of-market rates, low fees, ~99% core funding",
      "Business banking relationships — deposits follow our borrowers",
    ]],
    ["CAPABILITIES BUILT", NAVY, [
      "Mortgage banking & servicing — originate, sell, service for fee income",
      "Treasury: interest-rate swaps (+$2.1M in 2030), disciplined securities ladder",
      "CECL-grade credit administration and full loan review",
    ]],
    ["PRUNED FROM THE SHELF", AMBER, [
      "Credit card & installment lending — earned less than our cost of funds",
      "Below-market fixed CDs that customers rightly ignored",
      "Premises we didn't need — sold, leaned out occupancy",
    ]],
  ];
  let x = 0.6;
  cols.forEach(([h, col, items]) => {
    s.addShape("roundRect", { x, y: 1.75, w: 4.0, h: 4.7, rectRadius: 0.09, fill: { color: CREAM }, line: { type: "none" } });
    s.addText(h, { x: x + 0.25, y: 2.0, w: 3.5, h: 0.4, fontFace: BODY, fontSize: 13, bold: true, color: col, charSpacing: 1.5, margin: 0 });
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: { code: "2022", indent: 10 }, breakLine: i < items.length - 1, paraSpaceAfter: 12 } })),
      { x: x + 0.25, y: 2.55, w: 3.55, h: 3.7, fontFace: BODY, fontSize: 12, color: INK, margin: 0, valign: "top" });
    x += 4.22;
  });
  s.addNotes("KS (45 sec): Differentiation was subtraction as much as addition — we stopped doing what lost money and doubled down where we had an edge. Hand off to CU for the results.");
}

// ============ 9. RESULTS — EARNINGS TURN ============
{
  const s = lightSlide("The Earnings Turn", "Section 3 · Operating results, quarter by quarter");
  s.addChart(pres.ChartType.bar, [
    { name: "Operating earnings", labels: SIMQ, values: SIMQ.map(q => g(q, "bank1", "income", "operating_earnings")) },
    { name: "Net income", labels: SIMQ, values: SIMQ.map(q => g(q, "bank1", "income", "net_income")) },
  ], chartBase({
    x: 0.6, y: 1.7, w: 8.5, h: 5.1,
    chartColors: [GOLD, NAVY], barGapWidthPct: 60,
    showLegend: true, legendPos: "b", legendColor: MUT, legendFontSize: 11,
    valAxisMajorUnit: 1,
  }));
  tile(s, 9.4, 1.7, 3.3, 1.5, "−$2.5M", "FY2029 operating result — the rebuild year", { color: BAD, smallSize: 11 });
  tile(s, 9.4, 3.35, 3.3, 1.5, "+$7.8M", "FY2030 operating result — a $10.3M swing", { color: GOOD, smallSize: 11 });
  tile(s, 9.4, 5.0, 3.3, 1.5, "+$3.8M", "our record quarter (Q3/30) — 16.5% ROAE", { color: GOOD, smallSize: 11 });
  s.addNotes("CU (90 sec): Three shrinking losses, breakeven in Q3/29, then five straight profitable quarters capped by our best ever. FY30 net income $6.7M — after resuming tax payments, a problem we're glad to have.");
}

// ============ 10. MARGIN & EFFICIENCY ============
{
  const s = lightSlide("Margin Built, Costs Cut", "The two engines of the turnaround");
  s.addText("Net interest margin (%)", { x: 0.6, y: 1.65, w: 6, h: 0.3, fontFace: BODY, fontSize: 12.5, bold: true, color: INK, margin: 0 });
  s.addChart(pres.ChartType.line, [
    { name: "NIM", labels: SIMQ, values: series("bank1", "income", "nim", SIMQ) },
  ], chartBase({
    x: 0.6, y: 2.0, w: 5.9, h: 4.4, chartColors: [GOLD],
    lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 6,
    valAxisMinVal: 3.0, valAxisMaxVal: 4.4, valAxisMajorUnit: 0.4,
  }));
  s.addText("Efficiency ratio (%) — lower is better", { x: 6.85, y: 1.65, w: 6, h: 0.3, fontFace: BODY, fontSize: 12.5, bold: true, color: INK, margin: 0 });
  s.addChart(pres.ChartType.line, [
    { name: "Efficiency", labels: SIMQ, values: series("bank1", "income", "efficiency_ratio", SIMQ) },
  ], chartBase({
    x: 6.85, y: 2.0, w: 5.9, h: 4.4, chartColors: [AMBER],
    lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 6,
    valAxisMinVal: 55, valAxisMaxVal: 95, valAxisMajorUnit: 10,
  }));
  s.addText("3.12% → 4.10% at peak — repricing that stuck", { x: 0.6, y: 6.55, w: 5.9, h: 0.4, fontFace: BODY, fontSize: 12, italic: true, color: MUT, margin: 0 });
  s.addText("91% → 60% at best — a third less cost per dollar of revenue", { x: 6.85, y: 6.55, w: 5.9, h: 0.4, fontFace: BODY, fontSize: 12, italic: true, color: MUT, margin: 0 });
  s.addNotes("CU (60 sec): Left — margin: every loan repriced for its risk, funding costs floating down. Right — efficiency: the product pruning and volume discipline made the cost base a third lighter per revenue dollar. Both are structural.");
}

// ============ 11. TWO YEARS ON ONE PAGE ============
{
  const s = lightSlide("Two Years on One Page", "FY2029 vs FY2030 ($M)");
  const rows = [
    ["Net interest income", "23.9", "29.0"],
    ["Fees & other income", "8.3", "7.2"],
    ["Credit loss provision", "7.7", "5.3"],
    ["Operating expenses", "25.1", "23.1"],
    ["Operating earnings", "−0.6", "+7.8"],
    ["Net income", "−0.0", "+6.7"],
    ["Earnings per share", "−$0.03", "+$3.66"],
    ["Dividends per share", "$0.00", "$1.40"],
  ];
  const tbl = [[
    { text: "", options: { fill: { color: WHITE } } },
    { text: "FY2029", options: { bold: true, color: MUT, align: "right", fontSize: 13 } },
    { text: "FY2030", options: { bold: true, color: NAVY, align: "right", fontSize: 13 } },
  ]].concat(rows.map(([l, a, b], i) => [
    { text: l, options: { bold: i >= 4, color: INK, fontSize: i >= 4 ? 14 : 13 } },
    { text: a, options: { align: "right", color: MUT, fontSize: i >= 4 ? 14 : 13, bold: i >= 4 } },
    { text: b, options: { align: "right", color: i >= 4 ? "2E7D32" : NAVY, fontSize: i >= 4 ? 14 : 13, bold: i >= 4 } },
  ]));
  s.addTable(tbl, {
    x: 0.6, y: 1.7, w: 6.6, colW: [3.4, 1.6, 1.6], rowH: 0.52,
    fontFace: BODY, border: { type: "solid", color: GRID, pt: 0.5 }, valign: "middle", margin: 0.06,
  });
  tile(s, 7.6, 1.7, 5.1, 1.55, "+$10.3M", "swing in annual operating earnings", { color: GOOD, bigSize: 32, smallSize: 12 });
  tile(s, 7.6, 3.45, 5.1, 1.55, "9.4% ROAE", "full-year 2030 return on equity", { bigSize: 32, smallSize: 12 });
  tile(s, 7.6, 5.2, 5.1, 1.55, "$1.40 / share", "2030 dividends — restarted, then doubled", { bigSize: 30, smallSize: 12 });
  s.addNotes("CU (60 sec): The provision line matters: it came down because the book got safer, never because we stopped counting. Fees normalized after FY29's one-time loan-sale gains.");
}

// ============ 12. GOALS 2029 ============
{
  const s = lightSlide("Goal Realization — 2029", "Section 4 · The goals we set, graded honestly");
  const rows = [
    ["Net income $6.5M · ROAA 0.8%", "Missed in the rebuild year (−$0.0M / −0.01%) — delivered in 2030: $6.7M and 0.79%", false],
    ["Grow assets to $815M (+10%)", "Exceeded: $857.6M at year-end — deposit-funded growth", true],
    ["Raise capital to an 8% leverage ratio", "Raise completed ($18M+$5M); 7.57% at year-end, crossed 8% in early 2030", false],
  ];
  let y = 1.9;
  rows.forEach(([goal, result, hit]) => {
    s.addShape("ellipse", { x: 0.65, y: y + 0.12, w: 0.46, h: 0.46, fill: { color: hit ? GOOD : AMBER }, line: { type: "none" } });
    s.addText(hit ? "✓" : "▸", { x: 0.65, y: y + 0.12, w: 0.46, h: 0.46, align: "center", fontFace: BODY, fontSize: 18, bold: true, color: WHITE, margin: 0 });
    s.addText(goal, { x: 1.35, y, w: 4.7, h: 1.1, fontFace: BODY, fontSize: 15, bold: true, color: NAVY, margin: 0, valign: "top" });
    s.addText(result, { x: 6.25, y, w: 6.45, h: 1.1, fontFace: BODY, fontSize: 13, color: INK, margin: 0, valign: "top" });
    y += 1.32;
  });
  s.addShape("roundRect", { x: 0.6, y: 5.95, w: 12.1, h: 1.05, rectRadius: 0.08, fill: { color: CREAM }, line: { type: "none" } });
  s.addText([
    { text: "The conflict we named up front:  ", options: { bold: true, color: NAVY } },
    { text: "raising capital while growing is hard. We reconciled it by raising early, growing with deposits, and letting efficiency carry the earnings.", options: { color: INK } },
  ], { x: 0.85, y: 6.08, w: 11.6, h: 0.8, fontFace: BODY, fontSize: 12.5, margin: 0 });
  s.addNotes("AY (75 sec): Integrity means grading our own paper honestly. 2029: one exceeded, two amber — profitability arrived a year late because we chose to pre-fund credit and finish the capital plan first. Both amber goals fully landed in 2030.");
}

// ============ 13. GOALS 2030 ============
{
  const s = lightSlide("Goal Realization — 2030", "The goals we set, graded honestly");
  const rows = [
    ["Hit an ROAA of 1.2%", "Peaked at 1.45% in Q3/30 — our best quarter ever; full year 0.79% as we chose to keep reserving", false],
    ["Grow assets to $1 billion", "Chose not to chase it: held ~$820M and quadrupled earnings instead — size is not stewardship", false],
    ["Maintain an 8% leverage ratio", "Exceeded: 9.05% at year-end, with risk capital at 12.2% — buffers above every requirement", true],
  ];
  let y = 1.9;
  rows.forEach(([goal, result, hit]) => {
    s.addShape("ellipse", { x: 0.65, y: y + 0.12, w: 0.46, h: 0.46, fill: { color: hit ? GOOD : AMBER }, line: { type: "none" } });
    s.addText(hit ? "✓" : "▸", { x: 0.65, y: y + 0.12, w: 0.46, h: 0.46, align: "center", fontFace: BODY, fontSize: 18, bold: true, color: WHITE, margin: 0 });
    s.addText(goal, { x: 1.35, y, w: 4.7, h: 1.1, fontFace: BODY, fontSize: 15, bold: true, color: NAVY, margin: 0, valign: "top" });
    s.addText(result, { x: 6.25, y, w: 6.45, h: 1.1, fontFace: BODY, fontSize: 13, color: INK, margin: 0, valign: "top" });
    y += 1.32;
  });
  s.addShape("roundRect", { x: 0.6, y: 5.95, w: 12.1, h: 1.05, rectRadius: 0.08, fill: { color: CREAM }, line: { type: "none" } });
  s.addText([
    { text: "The reconciliation:  ", options: { bold: true, color: NAVY } },
    { text: "staying well-capitalized while lowering borrowings meant growing slower than the $1B goal — we believe shareholders got the better trade.", options: { color: INK } },
  ], { x: 0.85, y: 6.08, w: 11.6, h: 0.8, fontFace: BODY, fontSize: 12.5, margin: 0 });
  s.addNotes("AY (75 sec): 2030's grade is a stewardship story. We could have bought $180M of assets with cheap wholesale money and called the $1B goal 'achieved' — instead we kept the balance sheet clean and delivered record earnings and a doubled dividend. Own the trade-off proudly.");
}

// ============ 14. REGULATORY COMPLIANCE ============
{
  const s = lightSlide("The Distiller's License", "Regulatory compliance — two dings, both cured");
  const rows = [
    ["Boulder Capital Accord (6% / 10% by 4Q29)", "MET ON DEADLINE", "10.85% risk capital in Q4/29; ended 2030 at 12.2%", GOOD],
    ["Fed funds purchased ≤ 100% of equity", "BREACHED, THEN CURED", "Over the line Q2–Q3/29; cured Q4/29; $0 by Q3/30", AMBER],
    ["ACL / CECL requirements", "COMPLIANT THROUGHOUT", "Never below the floor; 106% coverage of non-performers at year-end", GOOD],
    ["100% loan review by Q3/29", "COMPLETED", "Full portfolio reviewed; findings drove early reserves", GOOD],
    ["Construction concentration guidance", "FLAGGED & MANAGED", "Peaked 198% of capital; deliberate glide to 147%, still falling", AMBER],
    ["Dividend cessation rule", "FOLLOWED", "Suspended when required; restarted lawfully, then doubled", GOOD],
  ];
  let y = 1.7;
  rows.forEach(([rule, status, detail, col]) => {
    s.addShape("roundRect", { x: 0.6, y, w: 12.1, h: 0.78, rectRadius: 0.06, fill: { color: "FAF7F0" }, line: { type: "none" } });
    s.addText(rule, { x: 0.85, y: y + 0.04, w: 4.35, h: 0.7, fontFace: BODY, fontSize: 11.5, bold: true, color: NAVY, margin: 0, valign: "middle" });
    s.addText(status, { x: 5.25, y: y + 0.04, w: 2.4, h: 0.7, fontFace: BODY, fontSize: 10.5, bold: true, color: col, margin: 0, valign: "middle" });
    s.addText(detail, { x: 7.7, y: y + 0.04, w: 4.9, h: 0.7, fontFace: BODY, fontSize: 10.5, color: INK, margin: 0, valign: "middle" });
    y += 0.88;
  });
  s.addNotes("AY (75 sec): Lead with the two honest dings — the fed-funds breach during 2029's loan surge (fixed structurally, not cosmetically) and construction concentration (a guidance flag we ran deliberately while it earned, then walked down). Everything else clean. The regulators' own verdict: C to A.");
}

// ============ 15. KPIs & ROAD AHEAD ============
{
  const s = lightSlide("What Defines Success From Here", "Section 5 · Six KPIs — financial, customer, cultural");
  const kpis = [
    ["ROAA ≥ 1.0%", "Financial", "exiting 2030 at 0.99% run-rate"],
    ["Efficiency ≤ 65%", "Financial", "2030 average: 64%"],
    ["Leverage ≥ 8% · Risk capital ≥ 11%", "Financial", "9.05% / 12.2% today"],
    ["Core deposits ≥ 95% of funding", "Customer", "~97% today — customers, not borrowings"],
    ["Business deposit share ≥ 30%", "Customer", "26% at year-end — the growth engine"],
    ["Meet or beat guidance", "Cultural", "credibility is compounding capital"],
  ];
  let i = 0;
  for (const [k, cat, now] of kpis) {
    const x = 0.6 + (i % 3) * 4.22, y = 1.75 + Math.floor(i / 3) * 1.85;
    s.addShape("roundRect", { x, y, w: 4.0, h: 1.65, rectRadius: 0.08, fill: { color: CREAM }, line: { type: "none" } });
    s.addText(cat.toUpperCase(), { x: x + 0.2, y: y + 0.12, w: 3.6, h: 0.3, fontFace: BODY, fontSize: 10, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
    s.addText(k, { x: x + 0.2, y: y + 0.42, w: 3.6, h: 0.55, fontFace: HEAD, fontSize: 15, bold: true, color: NAVY, margin: 0 });
    s.addText(now, { x: x + 0.2, y: y + 1.0, w: 3.6, h: 0.55, fontFace: BODY, fontSize: 11, color: MUT, margin: 0 });
    i++;
  }
  s.addShape("roundRect", { x: 0.6, y: 5.7, w: 12.1, h: 1.3, rectRadius: 0.08, fill: { color: "EFF2EE" }, line: { type: "none" } });
  s.addText([
    { text: "2031 outlook — ready to lead, ready to acquire:  ", options: { bold: true, color: "3E5C41" } },
    { text: "rates rising again and we are positioned for it; ~$100M of deposit-funded lending capacity; ≈$15M of capital above requirements and a stock near book value — dry powder for growth, dividends, buybacks, or the right acquisition.", options: { color: INK } },
  ], { x: 0.85, y: 5.88, w: 11.6, h: 1.0, fontFace: BODY, fontSize: 13, margin: 0 });
  s.addNotes("JS (2 min): Six KPIs across financial, customer, and cultural measures — each with today's reading. Close on M&A readiness: an acquirer needs three things — excess capital (we have ~$15M above requirements), a credible currency (stock at ~1.0x book and an A rating), and an integration-ready operating model (our efficiency and credit discipline). Two years ago we'd have been the target. Today we can be the buyer — organic remains plan A, but we are prepared to move if the right bank comes available.");
}

// ============ 16. CLOSING ============
{
  const s = darkSlide();
  s.addImage({ path: "bottle.jpg", x: 0.9, y: 1.35, w: 3.2, h: 4.8 });
  s.addText("Aged to Top Shelf.", { x: 4.7, y: 2.1, w: 8.0, h: 1.1, fontFace: HEAD, fontSize: 48, bold: true, color: WHITE, margin: 0 });
  const stats = [
    ["+$10.3M", "operating earnings swing"],
    ["C → A", "credit rating"],
    ["12.2%", "risk capital"],
    ["$1.40", "dividends restored"],
  ];
  let x = 4.7;
  stats.forEach(([b, t]) => {
    s.addText(b, { x, y: 3.7, w: 1.95, h: 0.55, fontFace: HEAD, fontSize: 24, bold: true, color: GOLD, margin: 0 });
    s.addText(t, { x, y: 4.25, w: 1.95, h: 0.6, fontFace: BODY, fontSize: 10.5, color: "C9CFDC", margin: 0 });
    x += 2.0;
  });
  s.addText("Thank you, shareholders. Questions welcome — we kept the receipts.", { x: 4.7, y: 5.4, w: 7.9, h: 0.5, fontFace: BODY, fontSize: 16, italic: true, color: "C9CFDC", margin: 0 });
  s.addNotes("Full team (30 sec + 5 min Q&A). Crib sheet: (1) Why dilute at the bottom? The penalty regime cost more than the dilution; later raises priced far better. (2) Construction risk? Priced for it, reviewed it, walked it down before the cycle forced us. (3) Is FY30 repeatable? The margin and cost base are structural; we guide conservatively on purpose. (4) Why believe the numbers? Every figure is from the regulatory reports, unadjusted.");
}

pres.writeFile({ fileName: "BOTB_Shareholder_Presentation.pptx" }).then(() => console.log("WROTE deck rev2"));
