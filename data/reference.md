# BMSim Rules & Playbook Reference

Distilled from the 2026 topic-session decks (Regulatory, Treasury, Deposits,
Credit Administration, Loan Administration). The Regulatory section drives the
dashboard's Risk-tab flags. Note: the sim writes dollar amounts with banker's
notation — **$100M = $100 thousand, $100MM = $100 million**.

## Regulatory (Office of Bank Supervision) — "Rules of Operation"

### Capital — the big one
- **Current minimums:** Leverage (Tier 1 / total assets) ≥ **5%**, Total Risk-Based
  Capital (Tier 1+2 / risk assets) ≥ **8%**. Below either = "undercapitalized" →
  special examination/supervision and a required correction plan.
- **Boulder Capital Accord (phase-in): by end of 4Q29 the minimums become
  Leverage ≥ 6% and TRBC ≥ 10%.** Missing either after that = VIOLATION +
  **$100M (=$100K) civil money penalty, doubling each additional occurrence** —
  even non-consecutive, even if it's the other ratio the next time.
- Ratios are reported on B550. Reference points (4Q28 start): leverage 6.35%, TRBC 8.64%.

### Dividends
- OBS can forbid or require prior approval of any dividend; forced cuts likely drop the stock price.
- **Dividends MUST cease after two consecutive quarters of negative operating
  earnings**; may restart after one quarter without operating losses (OBS gives notice).

### Allowance for Credit Losses (CECL Lite, live 12/31/28)
- Year-end 2028 ACL "should have been" 1.25% of total loans (ours entered 2029 at 0.85%).
- **3/31/29: minimum ACL = 1.00% of total loans.**
- **6/30/29 and beyond: ACL must be within ±10% of the CECL worksheet calculation.**
  - < 90% of CECL calc = VIOLATION.
  - > 110% ("overfunded") 2 consecutive quarters = VIOLATION; 3 consecutive = $100M CMP.
- Negative provisions only with prior regulatory approval (severe overfunding only).
- Enter a provision decision EVERY quarter (blank = system default, not zero).

### Funding & balance-sheet limits
- **Fed funds purchased > 100% of owners equity = prima facie unsafe & unsound** (ratio on B021).
- **FRB (discount window) borrowings ≤ 25% of equity**, 1-quarter money, must be re-requested each quarter.
- **FHLB total borrowings ≤ 200% of Tier 1 capital** (violation of law above that).
- **Public Time Deposits ≤ 100% of total capital (equity + sub debt)** and require
  pledged UST bills/bonds — insufficient pledging = violation. Public *demand*
  deposits and repos also require 100% UST pledging.
- Subordinated debt ≤ 35% of capital.
- Bonds with maturities > 5 years (incl. munis, excl. MBS) ≤ 50% of equity capital.
- Swaps: only with prior approval once condition improves; max $100MM outstanding.

### Other mandates
- **100% loan review must be completed by end of Q3-2029** or VIOLATION + $100M CMP.
- Buybacks: prior OBS approval, must stay well-capitalized after, none until 4 quarters
  after an issuance notice, max 30% of outstanding shares per quarter, retire at 10% premium.
- Fines hit "Other Expenses" (tax-deductible).
- OBS mandate to this bank: **read & initial the report, address capital, improve liquidity, fund the ACL.**

## Treasury Management

- Purchased funds menu: repos, fed funds purchased, FRB, brokered CDs, public time, FHLB.
- **Repos & FFP are not chosen — they auto-balance the bank.** Repos need unpledged
  UST; FFP needs none but watch the 100%-of-equity reg.
- **Brokered CDs:** 1–8 qtr maturities; amounts/rates on B501 are a function of credit
  rating (need **B or better** for reasonable access; ratings AA/A/B/C/D). Can request
  more than offered but at an unknown premium.
- **Public Time:** 1–4 qtrs, cheaper than brokered CDs but requires UST pledging.
- **FHLB fixed:** 1–80 qtrs; price = comparable Treasury + 25bp + 2bp/year of term.
  **FHLB variable:** always 4 qtrs, priced at commercial paper rate (B108/B900), reprices quarterly.
  Prepayment: variable = free; fixed > 4 qtrs = 2 quarters' interest penalty (hits operating expenses).
  FHLB with maturity > 3 qtrs shows in Long-Term Debt; ≤ 3 qtrs in Borrowed Funds.
  Membership needs ≥ 10% of assets in qualified housing (MBS, resi, multifamily, HELOC).
- **Capital raising is a 2-quarter, 2-decision process:** quarter 1 file an issue plan
  ($25K cost); quarter 2 B550 shows stock AND sub-debt offers in a ±20% range of the
  request — pick ONE (can't split) by entering issue code + amount, or the offer lapses.
  (Our $10M plan filed in Q1/29 → offers appeared on Q1/29 B550: sub notes 6.39% / 60 qtrs,
  or 418,334 shares at $23.90.)
- DPS and EPS forecast are "set" decisions (persist until changed). Accurate EPS
  forecasts build credibility; slight positive surprises are best.

## Deposits

- Products: DDA (business/public/individual), IB checking, savings, MMDA, retail CDs;
  plus non-relationship (listing-service) CDs and optional Private Banking division.
- Rate and fees drive volumes; behavior punishes big fee hikes. Minimum balances matter.
- **~75% of business DDA comes from loan customers** — loan pricing feeds deposit funding.
- Retail CDs: up to 8 products live at once, 1–40 qtr maturities; variable CDs price as a
  spread vs the 1-qtr T-bill (spread fixed for the CD's life, often negative).
  Demand: consistent at 4 qtrs; listing-service demand is short-term fixed and huge
  (~$200MM/qtr potential) — capped by our non-relationship limit decision.
- Business development $ phase in over 2–3 quarters.
- Price against END-OF-LAST-QUARTER market rates (B901) — they hold for the first 89
  days of the quarter. B900 gives community loan/deposit growth forecasts.

## Credit Administration

- **Two control tools:** (1) Maximum Outstandings per product — the cap on growth;
  (2) portfolio credit-quality targets (CQ 1&2/3/4/5/6 percentages) — set vs. what's
  actually achievable in one quarter given originations and runoff.
- CQ-6 average annual charge-off history (Decision Manual p15): NatCorp/MidMkt 1.1%,
  SmBiz/Trade 1.5%, **Construction 2.1%**, CRE 1.5%, Multifamily 1.0%, 1-4 Family 0.6%,
  Home Equity 0.8%, Personal 1.7%, **Credit Card 2.5%**, Installment 1.5%.
- Only so many 1–2 rated loans exist; staying out of 5–6 (≈33% of the market) makes
  growth hard — **price for the risk instead of refusing it**.
- Loan reviews cost 0.1% of the reviewed portfolio and can reclassify loans either way
  (remember the 100%-review-by-Q3 regulatory mandate).
- Credit policy: RE(strictive)/CO(ntrolled)/MO(derate)/EX(pansive). Instructors prefer
  Moderate or Controlled; changes take 2 quarters to bite — don't flip-flop.

## Loan Administration

- **Interest rate is the #1 driver of loan volume**; then max outstandings/targets,
  credit policy, max maturity, rate-adjustment period, fees, bus-dev, salaries,
  deposit relationships, premises.
- Base rate prices a 1-rated loan; max rate prices a 6-rated loan (B210 community rates
  shown are the average of the 1 and 6 decisions).
- Credit lines: no principal until maturity, 40–60% utilization, ≥4-qtr maturity
  preference, priced vs prime, annual fee on commitment. Term loans: amortizing, fully
  funded day 1, ≥8-qtr preference, priced vs comparable Treasury.
- When rates are low the bank wants to write variable (customers want fixed) — and vice versa.
- Quarterly economic newsletters hint at NEXT quarter's rate direction; current-quarter
  pricing should key off B901 end-of-quarter rates.
- Mortgage banking division: $25K to initiate; enables secondary-market sales.
