# BMSim Dashboard — Data Schema

This file is the contract for `data/quarters.json` and `data/decisions.json`.
**Every future quarter must be parsed with these exact keys.** If a report shows a
metric under a variant name, map it to the canonical key below — do not invent a
second key for the same metric.

## Parsing conventions

- **Structure:** `quarters.json` top-level keys are quarter labels (`"Q1/29"` = 1st quarter
  of sim-year 2029). Inside each quarter: `bank1` … `bank5`, plus a `community` object for
  market/economy data that isn't bank-specific. Dashboard code iterates keys matching
  `/^bank\d+$/`, so adding `community` (or other non-bank keys) never breaks it.
- **We are always `bank1`** in the community reports (B021, B022, B210, B450, B550).
- **Units:** dollar amounts in $ millions unless noted; rates/ratios in percent;
  per-share values in dollars; `*_min_bal` and fee amounts in dollars.
- **Rounding:** community reports round to 1 decimal. For `bank1`, prefer the bank-level
  reports (B001 Balance Sheet, B002 Income Statement) when they give more precision
  (e.g. `net_income: -0.627` from B002 instead of `-0.6` from B022).
- **Missing / not-applicable:** use `null` (e.g. `pe` when the report prints `NMF`).
- **Unreadable:** use the string `"needs_review"` — never guess a number.
- **New metrics:** add new keys freely (the dashboard ignores keys it doesn't know),
  but document each one here with its source report.
- Sections a bank doesn't have data for in a given quarter are simply omitted
  (e.g. Q4/28 baseline has only `balance` + `capital.stock_price` for banks 2–5).

## `income` — source: **B022 Community Income Statements** (all banks); **B002 Income Statement** (bank1 precision)

| Key | Report line | Notes |
|---|---|---|
| `interest_income` | Interest Income | $M, quarterly |
| `int_inc_loans` | Interest Income: Loans | |
| `int_inc_securities_taxable` | Securities: Txble | |
| `int_inc_tax_exempt` | Securities: Tax-Exempt | |
| `interest_expense` | Interest Expense | |
| `net_interest_income` | Net Interest Income | |
| `fees_svc_other` | Fees, Svc Chgs, Other | B002 = Fees and Service Charges + Other Income |
| `total_nii_fees` | Total NII & Fees | |
| `credit_loss_provision` | Credit Loss Provsn | |
| `operating_expenses` | Operating Expenses | |
| `operating_earnings` | Operating Earnings | **core performance — excludes one-time gains** |
| `gains_on_assets` | Gains/Losses-Assets | one-time; B002 "Gains, Losses on Assets" |
| `income_taxes` | Income Taxes | |
| `net_income` | Net Income | |
| `eps` | Earnings Per Share (B002/B550) | |
| `dps` | Dividends Per Share (B002) | |
| `te_int_inc_avg_ea` | TE Int Inc / Avg EA | % |
| `int_exp_avg_ibl` | Int Exp / Avg IBL | % |
| `spread` | Spread | % |
| `nim` | Net Interest Margin | % — canonical key is `nim`, never "net_interest_margin" |
| `chgoff_provision_pct` | ChgOff / CrLossProv | % |
| `fee_income_pct` | Fee Inc / NII +Fees | % |
| `efficiency_ratio` | Efficiency Ratio | % |
| `oper_earn_avg_assets` | OperEarn / AvgTotAs | % |
| `roaa` | ROAA | % — canonical for any "Return on Avg Assets" variant |
| `roae` | ROAE | % — canonical for any "Return on Avg Equity" variant |

## `balance` — source: **B021 Community Balance Sheets** (all banks); **B001 Balance Sheet** (bank1 detail)

| Key | Report line | Notes |
|---|---|---|
| `cash_due_from` | Cash & Due From | $M |
| `fed_funds_sold` | Federal Funds Sold | |
| `securities` | Securities | |
| `business_loans` | Business Loans | |
| `real_estate_loans` | Real Estate Loans | |
| `consumer_loans` | Consumer Loans | |
| `total_loans` | Total Loans (Net) | net of credit-loss allowance |
| `premises` | Premises (Net) | |
| `other_assets` | Other Assets | |
| `total_assets` | Total Assets | |
| `demand_deposits` | Demand Deposits | |
| `interest_checking` | Int-Bearing Chkg | |
| `savings` | Savings Accounts | |
| `money_market` | Money Market Accts | |
| `retail_cds` | Retail Certificates | |
| `public_brokered_cds` | Public/Brokered CDs | |
| `total_deposits` | Total Deposits | |
| `borrowed_funds` | Borrowed Funds | |
| `other_liabilities` | Other Liabilities | |
| `long_term_debt` | Long-Term Debt | |
| `subordinated_debt` | Subordinated Debt | |
| `owners_equity` | Owners Equity | |
| `net_liq_assets_ta` | Net Liq Assets / TA | % |
| `loans_to_deposits` | Loans / Deposits | % |
| `fed_funds_purch_equity` | Fed Fds Pur / Eqty | % |
| `core_deposit_ratio` | Core Dep / Tot Dep | % |
| `earning_assets_ta` | Earng Assets / TA | % |
| `int_bearing_liab_ta` | Int Bear Liab / TA | % |
| `acl_loans` | ACL / Loans | % |
| `nonperf_loans` | Non-Perf / Loans | % |
| `chgoff_avg_loans` | Chg Off / Avg Loans | % |
| `acl_nonperf` | ACL / Non-Perf | % |

## `capital` — source: **B550 Bank Capital Markets**

| Key | Report line | Notes |
|---|---|---|
| `stock_price` | Price/Share (current qtr) | $ — **likely win condition** |
| `stock_price_prev` | Price/Share (prior qtr) | $ |
| `stock_price_chg_pct` | Pcnt Chng | % |
| `pe` | PE | `null` when report prints `NMF` |
| `mkt_book` | Mkt/Book | ratio |
| `eps_forecast` | EPS Fcast | $ |
| `eps_actual` | EPS Actual | $ |
| `dps_qtr` | Dividends/Share Qtr | $ |
| `dividend_yield` | Dividend Yield | % |
| `credit_rating` | Credit Rating | letter |
| `shares_outstanding` | Shares Outstanding | count |
| `book_value` | Book Value | $/share |
| `leverage_ratio` | Leverage Ratio | % |
| `equity_risk_assets_ratio` | "Risk Assets" column under Owners Equity | % — column label is ambiguous in B550; interpreted as equity / risk-based assets |
| `risk_capital_ratio` | Risk Capital Ratio | % (total risk-based capital) |
| `capital_issue_planned` | Issue Planned | $M; `null` if blank |

## `deposit_rates` — source: **B450 Community Deposit Markets**

| Key | Report line | Notes |
|---|---|---|
| `ibc` | Interest-Bearing Checking: Interest Rate | % |
| `ibc_min_bal` | IBC Min Bal | $ |
| `mmda_premium` | Money Market: Premium Rate | % |
| `mmda_base` | Money Market: Base Interest | % |
| `mmda_min_bal` | Money Market: Minimum Balance | $ |
| `savings_ind` | Savings – Individual: Interest Rate | % |
| `savings_bus` | Savings – Business: Interest Rate | % |
| `nsf_fee_ind` | Individual Demand: NSF Fee | $ |
| `earnings_credit_bus` | Business Demand: Earnings Credit | % |
| `mkt_share_business` | Est. Share of Community: Business Markets | % |
| `mkt_share_public` | Est. Share of Community: Public Market | % |
| `mkt_share_individual` | Est. Share of Community: Individual Markets | % |

Retail-certificate rates in B450 are printed as community *ranges*, not per-bank —
not captured per-bank. If a future report gives per-bank CD rates, add keys
`retail_cd_<maturity>q` here.

## `loan_rates` — source: **B210 Community Loan Information** ("Rates on New Loans By Bank")

| Key | Report line |
|---|---|
| `national_credit_lines` | National Corporate: Credit Lines |
| `national_term` | National Corporate: Term |
| `middle_market_credit_lines` | Middle Market: Credit Lines |
| `middle_market_term` | Middle Market: Term |
| `small_business_credit_lines` | Small Business: Credit Lines |
| `small_business_term` | Small Business: Term |
| `trade_finance` | Trade Finance: Credit Lines |
| `construction` | Real Estate: Construction |
| `commercial_re` | Real Estate: Commercial |
| `multi_family` | Real Estate: Multi-family |
| `res_1_4_fixed` | 1-4 Family: Fixed Rate |
| `res_1_4_variable` | 1-4 Family: Var Rate |
| `home_equity` | 1-4 Family: Home Equity |
| `personal` | Consumer: Personal |
| `credit_card` | Consumer: Credit Card |
| `installment` | Consumer: Installment |

All in %. Origination/annual fees from B210 are not yet captured — add
`loan_fees` section if needed later.

## `risk` — bank1 only — sources: **B205 Loan Credit Quality**, **B531 Rate Sensitivity SUMMARY**

| Key | Source | Notes |
|---|---|---|
| `total_capital` | B205 Interagency Guidance block | $M |
| `cre_total` | B205 Total CRE | $M |
| `cre_construction` | B205 Construction | $M |
| `cre_commercial` | B205 Commercial | $M |
| `cre_multifamily` | B205 Multi-Family | $M |
| `cre_pct_capital` | B205 Pct of Total Capital (CRE) | % |
| `cre_guidance_pct` | B205 Guidance Threshold (CRE) | % (300) |
| `construction_pct_capital` | B205 Pct of Total Capital (Constr) | % |
| `construction_guidance_pct` | B205 Guidance Threshold (Constr) | % (100) |
| `nonaccrual_total` | B205 Total row, Non-Accrual $ | $M |
| `past_due_total` | B205 Total row, Past-Due $ | $M |
| `gap_q1`…`gap_q4` | B531 Net Gap (A − L) by repricing qtr | $M |
| `gap_1yr_cum` | B531 Net Gap, Total 4 Qtr | $M |
| `gap_over_1yr` | B531 Net Gap, Over 1 Year | $M |
| `gap_1yr_pct_ta` | B531 Net Gap / TotAst, Total 4 Qtr | % |
| `gap_over_1yr_pct_ta` | B531 Net Gap / TotAst, Over 1 Yr | % |

Competitor risk detail isn't published; the community reports only give the credit-quality
ratios captured in `balance` (`acl_loans`, `nonperf_loans`, `chgoff_avg_loans`, `acl_nonperf`).

## `community` — sources: **B900 Economic Report Summary**, **B108 Financial Markets**

| Key | Report line |
|---|---|
| `prime` | Prime |
| `fed_funds` | Federal Funds |
| `sofr` | SOFR |
| `discount_rate` | Discount Rate |
| `inflation` | Inflation rate |
| `gdp_change` | Change in Gross Domestic Product |
| `unemployment_national` | National unemployment rate |
| `unemployment_local` | Local unemployment rate |

## Baseline quarter `Q4/28`

Sources: the prior-quarter columns of the Q1/29 packet (B021 right block, B002
prior-quarter column) **plus the "2026 BMSim Starting Point Bank" packet**
(quarter ending 12/31/28), which is the identical state every bank started from.
Because of that, all five banks carry the same Q4/28 `income` ratios, `capital`,
`deposit_rates`, and `loan_rates`; bank1's `income` keeps the more precise B002
dollar figures. Caveats:

- `capital.stock_price_prev` in Q4/28 refers to Q3/28 ($33.70), and the starting
  credit rating was C (upgraded to B by Q1/29).
- `deposit_rates.mkt_share_*` is omitted for Q4/28 — the starting-point report
  shows 100% (single bank in its community), which is meaningless for comparison.
- Origination/annual fees existed in the starting-point B210 but per-bank fees are
  still not captured (see `loan_rates` note above).

## `detail.json` — Bank 1 report detail (searchable Details tab)

Self-describing table format so new reports can be added without touching dashboard
code — the Details tab renders whatever sections exist:

```json
{
  "Q1/29": {
    "sections": [
      { "id": "loan_profitability", "title": "…", "source": "B260 + B262",
        "columns": ["Product", "Avg balance", "…"],
        "rows": [["Nat'l Corp credit lines", 47.5, "…"]],
        "note": "optional caption" }
    ]
  }
}
```

Numbers as printed in the source report ($M quarterly unless the column says
otherwise; % annualized). `null` = blank in the report. Rows whose first cell starts
with `TOTAL` render bold. Current sections and sources: loan_profitability (B260+B262),
loan_activity + loan_commitments (B202), new_loan_quality (B206), loan_yields (B208),
funds_profitability (B602), deposit_cost (B460), core_deposit_activity (B401),
retail_cd_sales (B421), securities (B102), purchased_funds (B501), mortgage_banking
(B275), salaries (B600), premises (B601), private_banking (B465).

## `decisions.json`

```json
{
  "Q1/29": {
    "decisions": [
      { "category": "Loan pricing", "decision": "...", "rationale": "..." }
    ],
    "notes": "free text"
  }
}
```

`category` is free text (suggested: Loan pricing, Deposit pricing, Securities,
Funding, Capital/Dividend, Staffing/Expenses, Other). The dashboard's Decisions tab
edits this in browser localStorage and can export the merged JSON — download it and
commit it over `data/decisions.json` to make entries permanent.
