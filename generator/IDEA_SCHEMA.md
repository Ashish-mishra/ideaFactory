# Idea Markdown Schema

Every published idea must match this schema exactly. The portal parses `ideas/*.md` at build time — deviations break the build.

## Filename

`ideas/YYYY-MM-DD-<slug>.md`

- `YYYY-MM-DD` = date of generation (IST)
- `<slug>` = lowercase kebab-case, ≤ 40 chars, unique across all ideas

## Frontmatter (required)

```yaml
---
title: "Human-readable idea title (≤ 80 chars)"
slug: same-as-filename-slug
date: 2026-04-21
category: fintech | healthtech | d2c | saas | edtech | agritech | logistics | mediatech | devtools | climate
pitch: "One-sentence pitch. ≤ 160 chars. No trailing period."
score:
  market: 14
  capital: 12
  team: 8
  trend: 12
  moat: 10
  economics: 12
  speed: 8
  total: 76
capex_inr_lakh: 14
team_size: 3
time_to_mvp_weeks: 10
sources:
  - label: "Play Store — Finance, IN, rank 18"
    url: "https://play.google.com/store/apps/details?id=com.example"
    observed_on: 2026-04-20
  - label: "Product Hunt — Apr 2026"
    url: "https://www.producthunt.com/posts/example"
    observed_on: 2026-04-19
tags: [b2b, recurring-revenue, upi]
status: published
---
```

## Body (required sections, in this order)

```markdown
## Problem
2-3 sentences. Who hurts, how often, in India specifically.

## Solution
2-4 sentences. What you'd actually build for v1. No hand-waving — mention the core flow.

## Why Now
2-3 sentences citing the **trend source** in the frontmatter. What changed in India or globally that makes this viable today vs. 2 years ago.

## Target User
First 1000 customers. Be specific — city, job, income band, purchase trigger.

## Business Model
How it makes money. Pricing, unit economics assumption, expected gross margin.

## Competitive Landscape
- **Direct (India):** name 1-3 or say "none yet"
- **Direct (global reference):** name 1-2 from China/US that inspired this
- **Why we win:** 1-2 sentences on edge

## 6-Month Plan
Bullet list. What gets built month-by-month. Tie to ₹20L budget.

## Risks
3 bullets. Top 3 risks ranked by likelihood × impact.

## Score Breakdown
Reproduce the frontmatter score table as prose — one line per dimension explaining *why* that number.
```

## Validation rules

- `score.total` must equal the sum of the 7 component scores
- `score.total` must be ≥ 70
- `capex_inr_lakh` must be ≤ 20
- `team_size` must be in [1, 5]
- At least 1 entry in `sources` with `observed_on` ≤ 90 days ago
- `slug` must match `^[a-z0-9]+(-[a-z0-9]+)*$`
- `category` must be one of the enum values above

The portal's build step runs `node portal/scripts/validate-ideas.mjs` which fails CI if any idea violates the schema.
