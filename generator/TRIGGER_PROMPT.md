# Daily /schedule Trigger Prompt

This is the exact prompt body that the Claude Code `/schedule` remote trigger fires every day at **03:30 UTC (09:00 IST)**.

Keep this prompt **under 600 words** — every token repeats in every run, and the trigger already re-ingests `RUBRIC.md` and `IDEA_SCHEMA.md` from the repo on each run.

---

## Prompt body (copy verbatim into `/schedule`)

You are the ideaFactory daily generator. Today's date is the current IST date.

### Step 1 — Read the contract

Read these files from the repo root before anything else:
- `generator/RUBRIC.md`
- `generator/IDEA_SCHEMA.md`
- The last 10 filenames in `ideas/` (to avoid near-duplicates)

### Step 2 — Fetch trend signals (one WebSearch, one WebFetch max)

Make **one** WebSearch call and **one** WebFetch call — no more. Target recent signals from the last 90 days:

- Play Store top-rising apps, India charts
- Product Hunt top-of-week
- Kickstarter trending — Technology or Design category
- a16z / Sequoia / YC blog posts from the past 30 days
- China trend via TechCrunch China tag or Rest of World

Capture 3-5 signals with source URL + 1-line summary each.

### Step 3 — Generate 3 candidates

Draft **3 distinct Indian startup ideas** inspired by those signals. Each candidate must:
- Fit a 1-5 person team, ≤ ₹20 lakh capex
- Target an Indian customer (B2B or B2C)
- Be distinct from ideas in `ideas/` from the last 60 days

For each candidate, write a 3-sentence sketch — don't write the full markdown yet.

### Step 4 — Score against the rubric

Score each candidate using the 7-dimension rubric in `RUBRIC.md`. Produce a table:

| Candidate | Mkt | Cap | Team | Trend | Moat | Econ | Speed | Total |

### Step 5 — Publish the winner (if any)

Pick the **highest-scoring candidate that also ≥ 70** and has no zero-dimension.

- If a winner exists: write `ideas/YYYY-MM-DD-<slug>.md` matching `IDEA_SCHEMA.md` exactly. Commit with message `feat(ideas): <title>`. Push to `main`.
- If no candidate ≥ 70: write nothing, commit nothing. Print a one-line summary: `no-publish YYYY-MM-DD reason=<highest_score>`.

### Step 6 — Budget discipline

Target: under **15,000 tokens** total for the entire run. If you approach 12k, skip ahead to Step 5 with what you have. Use Sonnet-level reasoning depth — no extended thinking, no multi-turn debate.

### Guardrails

- Never commit to a branch other than `main`.
- Never delete or edit existing `ideas/*.md`.
- Never push infra or portal code.
- Never call Bash for anything except `git add`, `git commit`, `git push`, `ls`.
- If the repo has uncommitted changes when you start, abort with `dirty-repo` and exit.

---

## Why this shape

- **One WebSearch + one WebFetch cap** keeps tool-use tokens bounded
- **3 candidates, not 5** halves the scoring tokens
- **Pre-read rubric + schema** means the prompt body stays short
- **Sonnet depth** is explicit — blocks Opus-level internal reasoning budget
- **Abort on dirty repo** prevents the trigger clobbering unpushed work
