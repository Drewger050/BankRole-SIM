# BMSim Dashboard — Bank 1

Static dashboard for the BMSim bank-management simulation, tracking **Bank 1
("Bottom of the Barrel Bank", Community B)** against 4 competitors, quarter by quarter.
Runs entirely as a static site (vanilla JS + Chart.js CDN) — no build step, hosted on
GitHub Pages.

## Layout

```
index.html            the dashboard (single file, 5 tabs)
data/quarters.json    all parsed report data, keyed by quarter → bank → section
data/decisions.json   my decisions log, keyed by quarter
data/schema.md        the data contract: every metric key + which report it comes from
data/reference.md     sim rules distilled from the topic sessions (regulatory limits,
                      treasury/deposit/credit mechanics) — drives the Risk-tab flags
```

## Tabs

1. **Scoreboard** — latest-quarter ranking of all 5 banks; stock price and market/book
   lead (likely win condition), then net income, ROAA, NIM, efficiency. Rank badges per
   metric, my bank highlighted.
2. **Trajectory** — my key metrics across all quarters. Operating earnings is charted
   separately from reported net income so one-time gains (asset sales) don't disguise
   core performance.
3. **Rate Positioning** — my loan and deposit rates vs. the field per category, with
   flags where I'm the highest-cost deposit payer or lowest-yield lender, and
   my-rate-minus-median diverging charts.
4. **Risk** — CRE/construction concentration vs. interagency guidance, credit-quality
   trends for all banks, repricing gap, capital ratios vs. well-capitalized benchmarks,
   and an auto-computed flag list.
5. **Decisions** — decision log per quarter with the metric deltas that followed.
   Add/edit entries in the browser (saved to localStorage); use **Export decisions.json**
   and commit the downloaded file over `data/decisions.json` to make them permanent.

## Adding a new quarter

1. Get the quarter's full report packet (the community reports B021, B022, B210, B450,
   B550 contain all banks side by side; Bank 1 is always "us").
2. Parse it into a new top-level key in `data/quarters.json` (e.g. `"Q2/29"`), using the
   exact keys documented in `data/schema.md`. Rules:
   - one canonical key per metric — never invent a variant;
   - `null` for not-applicable (e.g. PE = NMF), `"needs_review"` for unreadable — never guess;
   - new metrics are fine (the dashboard ignores unknown keys) but must be added to `schema.md`.
3. Commit and push — the dashboard picks up new quarters automatically, and all trend
   charts extend.

## Running locally

Browsers block `fetch()` from `file://`, so serve the folder:

```
python3 -m http.server
# open http://localhost:8000
```

## GitHub Pages

Settings → Pages → "Deploy from a branch" → pick the branch and `/ (root)`.
