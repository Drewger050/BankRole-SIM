// Bottom of the Barrel Bank — 2026 GSBC Annual Shareholder Presentation
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const Q = JSON.parse(fs.readFileSync("quarters.json", "utf8"));

// ---------- data helpers ----------
const QTRS = ["Q4/28","Q1/29","Q2/29","Q3/29","Q4/29","Q1/30","Q2/30","Q3/30","Q4/30"];
const SIMQ = QTRS.slice(1); // played quarters
const g = (q, b, s, k) => { const v = Q[q]?.[b]?.[s]?.[k]; return (v === undefined || v === null) ? null : v; };
const series = (b, s, k, qs) => (qs || QTRS).map(q => g(q, b, s, k));

// ---------- brand ----------
const NAVY = "1F2A44", NAVY_D = "141C31", GOLD = "E3A94E", AMBER = "B9791F",
      CREAM = "F5F0E4", INK = "232733", MUT = "6E7480", GRID = "E4E0D5",
      GOOD = "2E7D32", BAD = "B3402E", WHITE = "FFFFFF";
const BANKCOLORS = { bank1: GOLD, bank2: "97A0AD", bank3: "6B8F71", bank4: "9A8FB8", bank5: "B98A64" };
const BANKNAMES = { bank1: "Us", bank2: "Bank 2", bank3: "Bank 3", bank4: "Bank 4", bank5: "Bank 5" };
const HEAD = "Cambria", BODY = "Calibri";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
const W = 13.33, H = 7.5;

// ---------- reusable bits ----------
function darkSlide() { const s = pres.addSlide(); s.background = { color: NAVY_D }; return s; }
function lightSlide(title, kicker) {
  const s = pres.addSlide(); s.background = { color: WHITE };
  if (kicker) s.addText(kicker.toUpperCase(), { x: 0.6, y: 0.32, w: 9.5, h: 0.32, fontFace: BODY, fontSize: 12, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.58, w: 12.1, h: 0.75, fontFace: HEAD, fontSize: 32, bold: true, color: NAVY, margin: 0 });
  return s;
}
function tile(s, x, y, w, h, big, small, opts = {}) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: opts.bg || CREAM }, line: { type: "none" } });
  s.addText(big, { x: x + 0.15, y: y + 0.12, w: w - 0.3, h: h * 0.52, fontFace: HEAD, fontSize: opts.bigSize || 28, bold: true, color: opts.color || NAVY, margin: 0, valign: "bottom" });
  s.addText(small, { x: x + 0.15, y: y + h * 0.58, w: w - 0.3, h: h * 0.4, fontFace: BODY, fontSize: opts.smallSize || 11, color: opts.sub || MUT, margin: 0, valign: "top" });
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

// =========================================================
// 1. TITLE
// =========================================================
{
  const s = darkSlide();
  s.addImage({ path: "bottle.jpg", x: 9.05, y: 0.75, w: 3.62, h: 5.43 });
  s.addText("BOTTOM OF THE BARREL BANK", { x: 0.75, y: 1.5, w: 8.1, h: 0.5, fontFace: BODY, fontSize: 16, bold: true, color: GOLD, charSpacing: 3, margin: 0 });
  s.addText("Aged Two Years.\nFinally Top Shelf.", { x: 0.75, y: 2.0, w: 8.2, h: 2.2, fontFace: HEAD, fontSize: 48, bold: true, color: WHITE, margin: 0, lineSpacing: 56 });
  s.addText("2026 Annual Shareholder Presentation  ·  Graduate School of Banking at Colorado", { x: 0.75, y: 4.35, w: 8.1, h: 0.4, fontFace: BODY, fontSize: 14, color: "C9CFDC", margin: 0 });
  s.addText("Team B1  ·  Community B  ·  Fiscal Years 2029–2030", { x: 0.75, y: 4.78, w: 8.1, h: 0.4, fontFace: BODY, fontSize: 14, color: "C9CFDC", margin: 0 });
  s.addText([
    { text: "$34.82 → $41.36", options: { bold: true, color: GOLD } },
    { text: "  share price   ·   ", options: { color: "C9CFDC" } },
    { text: "C → A", options: { bold: true, color: GOLD } },
    { text: "  credit rating   ·   ", options: { color: "C9CFDC" } },
    { text: "−$1.9M → +$6.7M", options: { bold: true, color: GOLD } },
    { text: "  annual net income", options: { color: "C9CFDC" } },
  ], { x: 0.75, y: 5.9, w: 8.2, h: 0.5, fontFace: BODY, fontSize: 14, margin: 0 });
  s.addNotes("Opening (CEO, 1 min): Two years ago this bank earned its name — losses, a funding emergency, a C rating. Today we hand shareholders an A-rated bank paying a growing dividend, trading above the price we inherited, with record earnings behind us. This is the story of how we aged it. [Advance]");
}

// =========================================================
// 2. VISION / MISSION / VALUES
// =========================================================
{
  const s = lightSlide("Vision, Mission & Values", "Who we are");
  const cards = [
    ["VISION", "To build a bank like a great bourbon: crafted with purpose, strengthened over time, and built to endure."],
    ["MISSION", "Slow-aged investment, distilled from trust, poured back into the community."],
    ["VALUES", "Crafted with purpose  ·  Strengthened over time  ·  Built to endure"],
  ];
  let y = 1.75;
  cards.forEach(([h, t]) => {
    s.addShape("roundRect", { x: 0.6, y, w: 8.0, h: 1.42, rectRadius: 0.08, fill: { color: CREAM }, line: { type: "none" } });
    s.addText(h, { x: 0.95, y: y + 0.18, w: 2.0, h: 0.35, fontFace: BODY, fontSize: 13, bold: true, color: AMBER, charSpacing: 2, margin: 0 });
    s.addText(t, { x: 0.95, y: y + 0.5, w: 7.3, h: 0.85, fontFace: HEAD, fontSize: 16, color: INK, margin: 0, italic: h !== "VALUES" });
    y += 1.68;
  });
  s.addImage({ path: "bottle.jpg", x: 9.35, y: 1.7, w: 3.1, h: 4.65 });
  s.addNotes("CEO (30 sec): Our founding metaphor wasn't a joke about our name — it was the operating model. Nothing we did was a quick fix; every decision was made to compound. Keep this slide fast.");
}

// =========================================================
// 3. AGENDA & TEAM
// =========================================================
{
  const s = lightSlide("Tonight's Pour — Agenda & Presenters", "15 minutes + 5 minutes Q&A");
  const rows = [
    ["1", "The Bank We Inherited", "[CEO — name]", "2 min"],
    ["2", "The Recipe — Strategy Over Two Years", "[KS — Lending & Credit]", "3 min"],
    ["3", "Proof — Operating Results FY29 & FY30", "[CU — Treasury & CFO]", "4 min"],
    ["4", "Goals & Regulatory Compliance", "[AY — Credit Administration]", "3 min"],
    ["5", "The Next Batch — Forward Look", "[JS — Deposits & Strategy]", "2 min"],
    ["6", "Closing & Questions", "Full team", "1 + 5 min"],
  ];
  let y = 1.7;
  rows.forEach(([n, t, who, mins]) => {
    s.addShape("ellipse", { x: 0.65, y: y + 0.06, w: 0.5, h: 0.5, fill: { color: NAVY }, line: { type: "none" } });
    s.addText(n, { x: 0.65, y: y + 0.06, w: 0.5, h: 0.5, align: "center", fontFace: HEAD, fontSize: 16, bold: true, color: GOLD, margin: 0 });
    s.addText(t, { x: 1.4, y, w: 6.6, h: 0.6, fontFace: BODY, fontSize: 17, bold: true, color: INK, margin: 0, valign: "middle" });
    s.addText(who, { x: 8.1, y, w: 3.4, h: 0.6, fontFace: BODY, fontSize: 14, color: MUT, margin: 0, valign: "middle" });
    s.addText(mins, { x: 11.6, y, w: 1.1, h: 0.6, fontFace: BODY, fontSize: 14, bold: true, color: AMBER, margin: 0, valign: "middle", align: "right" });
    y += 0.83;
  });
  s.addText("Every team member presents — swap the bracketed names for yours.", { x: 0.65, y: 6.85, w: 11, h: 0.35, fontFace: BODY, fontSize: 11, italic: true, color: MUT, margin: 0 });
  s.addNotes("CEO (20 sec): introduce the team and the flow. The initials match who owned each decision screen during the sim — each person presents what they actually ran.");
}

// =========================================================
// 4. WHAT WE INHERITED
// =========================================================
{
  const s = lightSlide("The Bank We Inherited", "January 2029 · Section 1");
  s.addImage({ path: "lemmings.png", x: 8.75, y: 1.55, w: 4.0, h: 4.0, sizing: { type: "cover", w: 4.0, h: 4.0 } });
  s.addText('Prior management’s strategy, illustrated.', { x: 8.75, y: 5.72, w: 4.0, h: 0.3, align: "center", fontFace: BODY, fontSize: 11, italic: true, color: MUT, margin: 0 });
  const t = [
    ["−$0.5M", "quarterly operating loss, and worsening"],
    ["187%", "fed funds purchased vs equity — regulatory limit is 100%"],
    ["0.85%", "loss reserve vs the 1.25% regulators expected"],
    ["8.64%", "risk capital vs a new 10% requirement due in 8 quarters"],
    ["C", "credit rating — wholesale funding nearly shut"],
    ["$34.82", "share price, cut from a $4.00 annual dividend habit it couldn't afford"],
  ];
  let y = 1.62; let i = 0;
  for (const [big, small] of t) {
    const x = 0.6 + (i % 2) * 4.05;
    tile(s, x, y + Math.floor(i / 2) * 1.55, 3.85, 1.35, big, small, { bigSize: 26, color: i < 4 ? BAD : NAVY });
    i++;
  }
  s.addNotes("CEO (2 min): Set the scene honestly — the name was earned. An unsafe-and-unsound funding position (fed funds at 187% of equity), an underfunded loss reserve, a dividend the earnings couldn't cover, and a new capital rule (the Boulder Accord: 6% leverage / 10% total risk-based by end of 2029) hanging over everything. The cartoon was our actual first slide as a team — we promised each other we'd stop following the lemmings. Q&A prep: if asked 'was it really that bad' — the C rating and the 187% number are both straight off the regulatory reports.");
}

// =========================================================
// 5. HERO — STOCK JOURNEY
// =========================================================
{
  const s = lightSlide("From Bottom of the Barrel to Top Shelf", "The two-year share price journey");
  const banks = ["bank1","bank2","bank3","bank4","bank5"];
  const data = banks.map(b => ({ name: BANKNAMES[b], labels: QTRS, values: series(b, "capital", "stock_price") }));
  s.addChart(pres.ChartType.line, data, chartBase({
    x: 0.6, y: 1.55, w: 8.6, h: 5.3,
    chartColors: banks.map(b => BANKCOLORS[b]),
    lineSize: 2.5, lineSmooth: false, lineDataSymbol: "circle", lineDataSymbolSize: 5,
    showLegend: true, legendPos: "b", legendColor: MUT, legendFontSize: 11,
    valAxisMinVal: 15, valAxisMaxVal: 55, valAxisMajorUnit: 10,
  }));
  tile(s, 9.5, 1.55, 3.2, 1.5, "$22.97", "the trough — Q2/29, after the rate shock and our dilution. We kept to the plan.", { color: BAD, smallSize: 10.5 });
  tile(s, 9.5, 3.2, 3.2, 1.5, "$47.41", "the peak — Q3/30, record quarter, 1.18× book", { color: GOOD, smallSize: 10.5 });
  tile(s, 9.5, 4.85, 3.2, 1.5, "#2 of 5", "final finish at $41.36 — from a dead-last trajectory", { smallSize: 10.5 });
  s.addNotes("KS (30 sec bridge): One chart is the whole story. Every bank started at $34.82. We fell hardest early — on purpose, as you'll see — and finished second, within $2 of the champion. The gold line is us. Q&A prep: 'why not #1?' — Bank 3 never had our starting problems; closing an 11-point gap to $2 in six quarters is the differentiated result.");
}

// =========================================================
// 6. STRATEGY — THE RECIPE
// =========================================================
{
  const s = lightSlide("The Recipe — Three Phases, Eight Quarters", "Section 2 · Strategy");
  const phases = [
    ["1 · THE MASH", "H1 2029 — Stabilize", [
      "Rebuilt funding: emergency fed funds (187% of equity) converted to core deposits — paid up to win the money",
      "Raised $12M common early, at $23.92 — before prices fell further",
      "Restarted mortgage banking; sold $13.6M of low-yield loans at a gain",
      "Cut the dividend to $0 — painful, mandatory, honest",
    ]],
    ["2 · THE BARREL", "H2 2029 — Reprice & Reserve", [
      "Repriced the entire loan book +100 to +300bp to top-of-market",
      "Froze money-losing products: credit card, installment, personal",
      "Pre-funded credit: provisions held at ~$2M/qtr; ACL to 1.2%+",
      "$5M subordinated notes + $6M stock — 10% capital rule met on deadline",
    ]],
    ["3 · THE POUR", "FY 2030 — Harvest", [
      "Variable-rate funding rode the rate collapse straight into margin",
      "Interest-rate swaps added +$2.1M of income across 2030",
      "Dividend restarted at $0.25, doubled to $0.50 by year-end",
      "De-risked construction from 198% of capital toward guidance",
    ]],
  ];
  let x = 0.6;
  phases.forEach(([h, sub, items]) => {
    s.addShape("roundRect", { x, y: 1.6, w: 4.0, h: 5.35, rectRadius: 0.09, fill: { color: CREAM }, line: { type: "none" } });
    s.addText(h, { x: x + 0.25, y: 1.85, w: 3.5, h: 0.4, fontFace: BODY, fontSize: 14, bold: true, color: AMBER, charSpacing: 1.5, margin: 0 });
    s.addText(sub, { x: x + 0.25, y: 2.25, w: 3.5, h: 0.4, fontFace: HEAD, fontSize: 16, bold: true, color: NAVY, margin: 0 });
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: { code: "2022", indent: 10 }, breakLine: i < items.length - 1, paraSpaceAfter: 8 } })),
      { x: x + 0.25, y: 2.75, w: 3.55, h: 4.0, fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "top" });
    x += 4.22;
  });
  s.addNotes("KS (90 sec): Walk one phase per column. The through-line: sequence matters. You cannot reprice loans while your funding is on fire, and you cannot harvest a margin you never repriced. Phase 1 bought stability with margin; Phase 2 traded volume for pricing power and pre-paid the credit bill; Phase 3 collected. Q&A prep: 'what was the biggest mistake?' — honest answer: our Round 1 loan-rate cuts; we corrected within one quarter and the correction became the strategy.");
}

// =========================================================
// 7. STRATEGY IN NUMBERS
// =========================================================
{
  const s = lightSlide("Strategy You Can See in the Numbers", "Decisions → results");
  const rows = [
    ["Reprice for risk", "Construction base rate 6.62% → 8.35% at the peak; every product priced above cost of funds by 2030", "Loan yield 6.3% → 8.0% at peak; #1 operating earnings in the field by Q3/30"],
    ["Win core funding", "Top-of-market deposit rates + fee cuts + service investment", "Business deposit share 27% → 36% peak; core funding 94.6% → ~99% of deposits; zero brokered money"],
    ["Exit what loses", "Froze card / installment / personal when they netted below cost of funds", "Consumer book $78M → $35M; salaries redeployed; efficiency 91% → 60% at best"],
    ["Capital early, cheapest", "$12M at $23.92, $6M at $28.41, $5M sub notes at 6.90%", "10% requirement met on deadline; finished at 12.2% — top-tier"],
    ["Position for the cycle", "Variable CDs/MMA/FHLB + swaps; asset-sensitive book", "Rate collapse became +$1.5M/yr of margin instead of a crisis"],
  ];
  let y = 1.6;
  rows.forEach(([h, did, got]) => {
    s.addShape("ellipse", { x: 0.62, y: y + 0.12, w: 0.34, h: 0.34, fill: { color: GOLD }, line: { type: "none" } });
    s.addText(h, { x: 1.12, y, w: 2.75, h: 1.0, fontFace: BODY, fontSize: 13.5, bold: true, color: NAVY, margin: 0, valign: "top" });
    s.addText(did, { x: 3.95, y, w: 4.35, h: 1.0, fontFace: BODY, fontSize: 11, color: INK, margin: 0, valign: "top" });
    s.addText(got, { x: 8.45, y, w: 4.25, h: 1.0, fontFace: BODY, fontSize: 11, color: "3E5C41", bold: true, margin: 0, valign: "top" });
    y += 1.08;
  });
  s.addText("WHAT WE DID", { x: 3.95, y: 1.28, w: 3, h: 0.3, fontFace: BODY, fontSize: 10, bold: true, color: MUT, charSpacing: 2, margin: 0 });
  s.addText("WHAT IT EARNED", { x: 8.45, y: 1.28, w: 3, h: 0.3, fontFace: BODY, fontSize: 10, bold: true, color: MUT, charSpacing: 2, margin: 0 });
  s.addNotes("KS (60 sec): Pick two rows and tell them fast — repricing and the consumer exit are the most vivid. Hand off to CU for results.");
}

// =========================================================
// 8. PROOF I — OPERATING EARNINGS BY QUARTER
// =========================================================
{
  const s = lightSlide("Proof — The Earnings Turn, Quarter by Quarter", "Section 3 · Operating results");
  const oe = SIMQ.map(q => g(q, "bank1", "income", "operating_earnings"));
  const ni = SIMQ.map(q => g(q, "bank1", "income", "net_income"));
  s.addChart(pres.ChartType.bar, [
    { name: "Operating earnings", labels: SIMQ, values: oe },
    { name: "Net income", labels: SIMQ, values: ni },
  ], chartBase({
    x: 0.6, y: 1.6, w: 8.5, h: 5.2,
    chartColors: [GOLD, NAVY], barGapWidthPct: 60,
    showLegend: true, legendPos: "b", legendColor: MUT, legendFontSize: 11,
    showValue: false, valAxisMajorUnit: 1,
  }));
  tile(s, 9.4, 1.6, 3.3, 1.6, "−$2.5M", "operating result, FY2029 — the price of the rebuild", { color: BAD, smallSize: 11 });
  tile(s, 9.4, 3.38, 3.3, 1.6, "+$7.8M", "operating result, FY2030 — a $10.3M swing", { color: GOOD, smallSize: 11 });
  tile(s, 9.4, 5.16, 3.3, 1.6, "+$3.8M", "record quarter (Q3/30): 16.5% ROAE, best in community", { color: GOOD, smallSize: 11 });
  s.addNotes("CU (90 sec): The shape matters more than any single bar. Three losing quarters — each one smaller — breakeven in Q3/29, then five straight profitable quarters including the community's best single quarter. FY29 operating loss $2.5M; FY30 operating profit $7.8M. Reported net income for FY30: $6.7M after we resumed paying taxes — a problem we're delighted to have. Q&A prep: 'was FY30 just falling rates?' — partly (variable funding helped ~$1.5M), but margin held when rates ROSE again in H2/30, because the book itself was repriced.");
}

// =========================================================
// 9. PROOF II — MARGIN & EFFICIENCY
// =========================================================
{
  const s = lightSlide("Margin Built, Costs Cut", "The two engines of the turnaround");
  const nim1 = series("bank1", "income", "nim", SIMQ);
  const nim3 = series("bank3", "income", "nim", SIMQ);
  s.addText("Net interest margin (%) — us vs. the champion", { x: 0.6, y: 1.55, w: 6, h: 0.3, fontFace: BODY, fontSize: 12.5, bold: true, color: INK, margin: 0 });
  s.addChart(pres.ChartType.line, [
    { name: "Us", labels: SIMQ, values: nim1 },
    { name: "Bank 3", labels: SIMQ, values: nim3 },
  ], chartBase({
    x: 0.6, y: 1.9, w: 5.9, h: 4.6, chartColors: [GOLD, BANKCOLORS.bank3],
    lineSize: 2.5, lineDataSymbol: "circle", lineDataSymbolSize: 5,
    showLegend: true, legendPos: "b", legendColor: MUT, legendFontSize: 11,
    valAxisMinVal: 3.0, valAxisMaxVal: 4.4, valAxisMajorUnit: 0.4,
  }));
  const eff = series("bank1", "income", "efficiency_ratio", SIMQ);
  s.addText("Efficiency ratio (%) — lower is better", { x: 6.85, y: 1.55, w: 6, h: 0.3, fontFace: BODY, fontSize: 12.5, bold: true, color: INK, margin: 0 });
  s.addChart(pres.ChartType.line, [
    { name: "Efficiency", labels: SIMQ, values: eff },
  ], chartBase({
    x: 6.85, y: 1.9, w: 5.9, h: 4.6, chartColors: [AMBER],
    lineSize: 2.5, lineDataSymbol: "circle", lineDataSymbolSize: 5,
    valAxisMinVal: 55, valAxisMaxVal: 95, valAxisMajorUnit: 10,
  }));
  s.addText("3.12% → 4.10% at peak: from 2nd-worst to top of the field", { x: 0.6, y: 6.6, w: 5.9, h: 0.4, fontFace: BODY, fontSize: 11.5, italic: true, color: MUT, margin: 0 });
  s.addText("91% → 60% at best: every dollar of revenue costs a third less to earn", { x: 6.85, y: 6.6, w: 5.9, h: 0.4, fontFace: BODY, fontSize: 11.5, italic: true, color: MUT, margin: 0 });
  s.addNotes("CU (60 sec): Two engines. Left — margin: we crossed the champion's NIM in mid-2030 and held above 3.9% for the second half. Right — efficiency: the consumer exit and volume discipline took us from one of the field's worst cost structures to its best. These are structural, not cyclical.");
}

// =========================================================
// 10. TWO-YEAR P&L
// =========================================================
{
  const s = lightSlide("Two Years on One Page", "FY2029 vs FY2030 ($M)");
  const rows = [
    ["Net interest income", "23.9", "29.0", true],
    ["Fees & other income", "8.3", "7.2", false],
    ["Credit loss provision", "7.7", "5.3", true],
    ["Operating expenses", "25.1", "23.1", true],
    ["Operating earnings", "−0.6", "+7.8", true],
    ["Net income", "−0.0", "+6.7", true],
    ["Earnings per share", "−$0.03", "+$3.66", true],
    ["Dividends per share", "$0.00", "$1.40", true],
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
    x: 0.6, y: 1.65, w: 6.6, colW: [3.4, 1.6, 1.6], rowH: 0.52,
    fontFace: BODY, border: { type: "solid", color: GRID, pt: 0.5 }, valign: "middle", margin: 0.06,
  });
  tile(s, 7.6, 1.65, 5.1, 1.55, "+$10.3M", "swing in annual operating earnings, FY29 → FY30", { color: GOOD, bigSize: 32, smallSize: 12 });
  tile(s, 7.6, 3.4, 5.1, 1.55, "9.4% ROAE", "full-year 2030 return on equity — from −7.5% in H1/29", { bigSize: 32, smallSize: 12 });
  tile(s, 7.6, 5.15, 5.1, 1.55, "$1.40 / share", "dividends paid in 2030, restarted from zero and doubled during the year", { bigSize: 30, smallSize: 12 });
  s.addNotes("CU (60 sec): FY29 was the investment year — every dollar of that $0.6M operating loss shows up in FY30's $7.8M. Note the provision line: we NEVER bought earnings by under-reserving; provisions came down because the book got safer, not because we stopped counting. Q&A prep: fees fell year-over-year because FY29 included one-time loan-sale gains and origination surges — FY30 fees are the clean run-rate.");
}

// =========================================================
// 11. BALANCE SHEET TRANSFORMATION
// =========================================================
{
  const s = lightSlide("A Bigger, Safer Balance Sheet", "Q4/28 vs Q4/30 ($M)");
  const cats = ["Total assets", "Loans", "Deposits", "Equity + sub debt"];
  const start = [739.8, 588.0, 551.1, 47.0];
  const end = [818.1, 663.2, 658.0, 80.0];
  s.addChart(pres.ChartType.bar, [
    { name: "Start (Q4/28)", labels: cats, values: start },
    { name: "Finish (Q4/30)", labels: cats, values: end },
  ], chartBase({
    x: 0.6, y: 1.6, w: 7.3, h: 5.2, chartColors: ["C9C4B7", GOLD],
    showLegend: true, legendPos: "b", legendColor: MUT, legendFontSize: 11,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: MUT, dataLabelFontSize: 10,
    barGapWidthPct: 80, valAxisMaxVal: 900,
  }));
  const pts = [
    ["Funding flipped", "Loans/deposits 106.7% → 100.8%; fed funds purchased $88M → $0; zero brokered CDs"],
    ["Mix upgraded", "Consumer runoff (−$43M) recycled into business (+$52M) and better-priced RE"],
    ["Liquidity restored", "Net liquid assets positive for the first time in the sim; $21.7M fed funds SOLD at year-end"],
  ];
  let y = 1.75;
  pts.forEach(([h, t]) => {
    s.addText(h, { x: 8.25, y, w: 4.4, h: 0.35, fontFace: BODY, fontSize: 14, bold: true, color: NAVY, margin: 0 });
    s.addText(t, { x: 8.25, y: y + 0.38, w: 4.4, h: 1.0, fontFace: BODY, fontSize: 11.5, color: INK, margin: 0 });
    y += 1.72;
  });
  s.addNotes("CU (45 sec): We grew $78M while REDUCING risk: the loan-to-deposit ratio came back to par, wholesale funding went to zero, and equity+sub-debt grew 70%. Growth funded by depositors who chose us, not by overnight borrowings.");
}

// =========================================================
// 12. GOAL REALIZATION
// =========================================================
{
  const s = lightSlide("Goal Realization — The Scorecard", "Section 4 · What we promised vs. what happened");
  const rows = [
    ["Return to profitability", "Breakeven by Q4/29", "Breakeven Q3/29 — one quarter early; record +$3.8M by Q3/30", true],
    ["Meet the Boulder Accord", "10% risk capital by Q4/29", "10.85% on the deadline; finished 2030 at 12.2%", true],
    ["Fix the funding base", "FFP < 100% of equity, durably", "Cured twice, then structurally: 0% by Q3/30; ~99% core deposits", true],
    ["Restore the dividend", "Restart when lawful & sustainable", "$0.25 in Q1/30 → $0.50 by Q4/30; $1.40 paid for the year", true],
    ["Rebuild market credibility", "Regain B rating; guide honestly", "C → B → A; beat guidance 4 of final 5 quarters", true],
    ["Win the stock race", "Finish top of the community", "#2 of 5 at $41.36 — within $1.75 of the champion", false],
  ];
  let y = 1.62;
  rows.forEach(([goal, target, result, hit]) => {
    s.addShape("ellipse", { x: 0.62, y: y + 0.1, w: 0.4, h: 0.4, fill: { color: hit ? GOOD : AMBER }, line: { type: "none" } });
    s.addText(hit ? "✓" : "▸", { x: 0.62, y: y + 0.1, w: 0.4, h: 0.4, align: "center", fontFace: BODY, fontSize: 16, bold: true, color: WHITE, margin: 0 });
    s.addText(goal, { x: 1.2, y, w: 3.15, h: 0.85, fontFace: BODY, fontSize: 13, bold: true, color: NAVY, margin: 0, valign: "top" });
    s.addText(target, { x: 4.45, y, w: 3.1, h: 0.85, fontFace: BODY, fontSize: 11.5, color: MUT, margin: 0, valign: "top" });
    s.addText(result, { x: 7.7, y, w: 5.0, h: 0.85, fontFace: BODY, fontSize: 11.5, bold: true, color: INK, margin: 0, valign: "top" });
    y += 0.89;
  });
  s.addText("THE GOAL", { x: 1.2, y: 1.3, w: 2, h: 0.28, fontFace: BODY, fontSize: 10, bold: true, color: MUT, charSpacing: 2, margin: 0 });
  s.addText("THE TARGET", { x: 4.45, y: 1.3, w: 2, h: 0.28, fontFace: BODY, fontSize: 10, bold: true, color: MUT, charSpacing: 2, margin: 0 });
  s.addText("THE RESULT", { x: 7.7, y: 1.3, w: 2, h: 0.28, fontFace: BODY, fontSize: 10, bold: true, color: MUT, charSpacing: 2, margin: 0 });
  s.addNotes("AY (90 sec): Five of six goals fully hit, most early or exceeded. Be candid on the sixth — we set out to win the stock race and finished second by $1.75, from the worst starting position in the field. Q&A prep: 'what would #1 have taken?' — one quarter less construction concentration and one fewer capital raise; Bank 3 never had to dilute.");
}

// =========================================================
// 13. REGULATORY COMPLIANCE
// =========================================================
{
  const s = lightSlide("The Distiller's License", "Section 4 · Regulatory compliance — two dings, both cured");
  const rows = [
    ["Boulder Capital Accord (6% / 10% by 4Q29)", "MET ON DEADLINE", "10.85% TRBC in Q4/29 via $18M common + $5M sub notes; ended at 12.2% / 9.05% leverage", GOOD],
    ["Fed funds purchased ≤ 100% of equity", "BREACHED, THEN CURED", "Over the line Q2–Q3/29 during the loan surge (132%, 139%); cured Q4/29; $0 by Q3/30 — never again", AMBER],
    ["ACL / CECL requirements", "COMPLIANT THROUGHOUT", "Never below the 1.00% floor; coverage rebuilt to 106% of non-performers by final quarter", GOOD],
    ["100% loan review by Q3/29", "COMPLETED", "Full portfolio reviewed across R1–R2 cycles; findings drove our early downgrades and reserves", GOOD],
    ["Construction concentration guidance (100%)", "FLAGGED & MANAGED", "Peaked at 198% of capital Q1/30; deliberate glide path to 147% by year-end, continuing down", AMBER],
    ["Dividend cessation rule", "FOLLOWED TO THE LETTER", "Suspended on two negative quarters; restarted only after clean quarters, with regulator notice", GOOD],
  ];
  let y = 1.58;
  rows.forEach(([rule, status, detail, col]) => {
    s.addShape("roundRect", { x: 0.6, y, w: 12.1, h: 0.85, rectRadius: 0.06, fill: { color: y % 2 ? "FAF7F0" : "FAF7F0" }, line: { type: "none" } });
    s.addText(rule, { x: 0.85, y: y + 0.06, w: 4.3, h: 0.75, fontFace: BODY, fontSize: 11.5, bold: true, color: NAVY, margin: 0, valign: "middle" });
    s.addText(status, { x: 5.2, y: y + 0.06, w: 2.35, h: 0.75, fontFace: BODY, fontSize: 10.5, bold: true, color: col, margin: 0, valign: "middle" });
    s.addText(detail, { x: 7.6, y: y + 0.06, w: 5.0, h: 0.75, fontFace: BODY, fontSize: 10.5, color: INK, margin: 0, valign: "middle" });
    y += 0.92;
  });
  s.addNotes("AY (90 sec): Lead with honesty — it disarms the question. We had exactly two compliance issues in eight quarters: the fed-funds breach (a growth-outran-funding problem we fixed structurally, not cosmetically) and construction concentration (a flagged guidance item, not a violation, which we took to 198% deliberately when it was our most profitable asset, then walked down as the cycle aged). Everything else — capital, CECL, loan review, dividends — clean. The rating agencies agreed: C to A.");
}

// =========================================================
// 14. RISK MANAGED — CONSTRUCTION & CREDIT
// =========================================================
{
  const s = lightSlide("Managing the Riskiest Cask", "Construction concentration & credit quality");
  const cq = ["Q1/29","Q2/29","Q3/29","Q4/29","Q1/30","Q2/30","Q3/30","Q4/30"];
  const constr = cq.map(q => g(q, "bank1", "risk", "construction_pct_capital"));
  const guide = cq.map(() => 100);
  s.addText("Construction loans as % of total capital vs. 100% guidance", { x: 0.6, y: 1.55, w: 6.5, h: 0.3, fontFace: BODY, fontSize: 12.5, bold: true, color: INK, margin: 0 });
  s.addChart(pres.ChartType.line, [
    { name: "Construction / capital", labels: cq, values: constr },
    { name: "Guidance", labels: cq, values: guide },
  ], chartBase({
    x: 0.6, y: 1.9, w: 6.4, h: 4.6, chartColors: [AMBER, "B3402E"],
    lineSize: 2.5, lineDataSymbol: "circle", lineDataSymbolSize: 5,
    showLegend: true, legendPos: "b", legendColor: MUT, legendFontSize: 11,
    valAxisMinVal: 0, valAxisMaxVal: 220, valAxisMajorUnit: 50,
  }));
  const pts = [
    ["Why we held it", "Construction was our best asset: 8-9% gross yields, ~8% net of losses at the peak — while it earned, we let it age"],
    ["Why we cut it", "Leading indicators turned in late 2029; commitments halted, book glided 198% → 147% with more runoff scheduled"],
    ["What it cost us", "Nothing yet — construction charge-offs stayed modest; reserves ended at 106% of ALL non-performers"],
  ];
  let y = 1.9;
  pts.forEach(([h, t]) => {
    s.addText(h, { x: 7.35, y, w: 5.3, h: 0.35, fontFace: BODY, fontSize: 13.5, bold: true, color: NAVY, margin: 0 });
    s.addText(t, { x: 7.35, y: y + 0.36, w: 5.3, h: 1.05, fontFace: BODY, fontSize: 11.5, color: INK, margin: 0 });
    y += 1.55;
  });
  s.addNotes("AY (45 sec): This is the slide the sharpest shareholder will ask about, so present it first. We ran our biggest risk on purpose, priced it properly, watched it weekly, and took it down before the economy told us to. Coverage of non-performers finished at 106% — the strongest in our history.");
}

// =========================================================
// 15. FORWARD LOOK
// =========================================================
{
  const s = lightSlide("The Next Batch — Managing to Lead in 2031", "Section 5 · Forward look");
  const left = [
    ["Rate tailwind", "Rates are rising again (fed funds 2.3% → 3.8% in H2/30). We are asset-sensitive — every +100bp adds ~$0.4M/qtr of margin as the book reprices."],
    ["Room to grow, funded", "Loans/deposits at 100.8% with ~99% core funding and positive liquidity — we can add ~$50M of loans without a single wholesale dollar."],
    ["Capital to deploy", "12.2% risk capital vs the 10% floor ≈ $15M of deployable strength: growth, dividend increases, or the buyback we are now eligible for."],
  ];
  const right = [
    ["Dividend path", "$0.50/qtr today; payout still under 50% of run-rate earnings — room to raise as earnings season."],
    ["Finish the de-risking", "Construction glide continues toward 100% of capital; consumer exit complete; NPLs 1.1% with 106% coverage."],
    ["What we watch", "Deposit competition re-heating; credit seasoning in the 2029 vintage; keeping efficiency in the low 60s as we grow."],
  ];
  let y = 1.62;
  left.forEach(([h, t]) => {
    s.addShape("roundRect", { x: 0.6, y, w: 6.0, h: 1.62, rectRadius: 0.08, fill: { color: CREAM }, line: { type: "none" } });
    s.addText(h, { x: 0.85, y: y + 0.13, w: 5.5, h: 0.35, fontFace: BODY, fontSize: 14, bold: true, color: AMBER, margin: 0 });
    s.addText(t, { x: 0.85, y: y + 0.5, w: 5.55, h: 1.05, fontFace: BODY, fontSize: 11.5, color: INK, margin: 0 });
    y += 1.78;
  });
  y = 1.62;
  right.forEach(([h, t]) => {
    s.addShape("roundRect", { x: 6.75, y, w: 6.0, h: 1.62, rectRadius: 0.08, fill: { color: "EFF2EE" }, line: { type: "none" } });
    s.addText(h, { x: 7.0, y: y + 0.13, w: 5.5, h: 0.35, fontFace: BODY, fontSize: 14, bold: true, color: "3E5C41", margin: 0 });
    s.addText(t, { x: 7.0, y: y + 0.5, w: 5.55, h: 1.05, fontFace: BODY, fontSize: 11.5, color: INK, margin: 0 });
    y += 1.78;
  });
  s.addText("The bank is positioned to lead: priced right, funded right, reserved right — with dry powder.", { x: 0.6, y: 7.0, w: 12.1, h: 0.35, fontFace: HEAD, fontSize: 14, italic: true, color: NAVY, margin: 0, align: "center" });
  s.addNotes("JS (2 min): Forward look = three tailwinds, three disciplines. The one-sentence thesis: the same machine that produced $7.8M in 2030 now has rising rates, spare deposit capacity, and $15M of excess capital behind it. If asked for FY31 guidance: run-rate suggests $8-10M operating earnings if rates hold their upward drift and credit stays benign — but we guide conservatively on purpose; it's why we beat.");
}

// =========================================================
// 16. CLOSING
// =========================================================
{
  const s = darkSlide();
  s.addImage({ path: "bottle.jpg", x: 0.9, y: 1.35, w: 3.2, h: 4.8 });
  s.addText("Aged two years.\nBuilt to endure.", { x: 4.7, y: 1.7, w: 8.0, h: 1.9, fontFace: HEAD, fontSize: 44, bold: true, color: WHITE, margin: 0, lineSpacing: 52 });
  const stats = [
    ["+$10.3M", "operating earnings swing"],
    ["C → A", "credit rating"],
    ["12.2%", "risk capital"],
    ["$1.40", "dividends restored"],
  ];
  let x = 4.7;
  stats.forEach(([b, t]) => {
    s.addText(b, { x, y: 3.9, w: 1.95, h: 0.55, fontFace: HEAD, fontSize: 24, bold: true, color: GOLD, margin: 0 });
    s.addText(t, { x, y: 4.45, w: 1.95, h: 0.6, fontFace: BODY, fontSize: 10.5, color: "C9CFDC", margin: 0 });
    x += 2.0;
  });
  s.addText("Thank you, shareholders. Questions welcome — we kept the receipts.", { x: 4.7, y: 5.6, w: 7.9, h: 0.5, fontFace: BODY, fontSize: 16, italic: true, color: "C9CFDC", margin: 0 });
  s.addNotes("Full team (30 sec + 5 min Q&A): Each member stands for questions in their area. Closing line as written. Q&A crib sheet — hardest expected questions: (1) Why did you dilute at 0.52x book? Because the penalty regime was worse and waiting cost more; the later raises were at 0.75x and above. (2) Construction at 198%? Priced for it, reviewed it, took it down before the cycle did. (3) Is FY30 repeatable? Margin is structural; rate tailwind is a bonus; guide conservative. (4) Why trust your numbers? Every figure tonight is from the regulatory reports B001-B901 — nothing adjusted.");
}

pres.writeFile({ fileName: "BOTB_Shareholder_Presentation.pptx" }).then(() => console.log("WROTE BOTB_Shareholder_Presentation.pptx"));
