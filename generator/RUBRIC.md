---
name: ideaFactory Scoring Rubric
version: 1.0
threshold: 70
---

# Scoring Rubric — India Startup Viability (1-5 person team, ≤₹20 lakh capex)

Every candidate idea is scored on a **100-point scale** across 7 weighted dimensions.
An idea is **published only if its total score ≥ 70** AND no single dimension scores `0`.

The rubric blends three industry frameworks:

- **RICE** (Reach, Impact, Confidence, Effort) — product prioritisation
- **Sequoia Arc memo framework** — market, team, moat
- **Lean Canvas capital efficiency** — bootstrap reality check

## Dimensions

| # | Dimension                      | Weight | Description                                                                                                 |
|---|--------------------------------|-------:|-------------------------------------------------------------------------------------------------------------|
| 1 | Market Size (India TAM)        |     20 | Reachable Indian customers in 3 years. 20 = ₹1000Cr+ TAM. 10 = ₹100Cr. 0 = hobbyist niche.                   |
| 2 | Capital Efficiency             |     15 | Can MVP + 12 months runway fit in ₹20L? 15 = ₹5L MVP. 8 = ₹15L. 0 = needs ₹50L+.                            |
| 3 | Team Feasibility (1-5 people)  |     10 | Can a small team ship v1 in ≤6 months? 10 = 1-2 devs. 5 = 3-4 people with one specialist. 0 = needs ≥10.    |
| 4 | Trend Momentum (China/US)      |     15 | Evidence of traction elsewhere — Play Store charts, Kickstarter funding, Product Hunt, YC batches.          |
| 5 | Moat & Defensibility           |     15 | Data, network effects, brand, regulatory, switching cost. 0 = pure reseller with no edge.                   |
| 6 | Unit Economics                 |     15 | Gross margin, CAC:LTV feasibility. 15 = 70%+ margin, viral loop. 0 = sub-₹0 margin before scale.            |
| 7 | Time-to-MVP / Execution Speed  |     10 | Weeks from kickoff to first paying user. 10 = ≤6 weeks. 5 = 12 weeks. 0 = ≥9 months (regulatory, hardware). |
|   | **Total**                      |   **100** |                                                                                                             |

## Published-idea requirements

A candidate promotes to `ideas/*.md` **only if all true**:

- Total score ≥ **70**
- No dimension scored `0`
- At least **one cited trend source** from the last 90 days (Play Store / Kickstarter / Product Hunt / YC / a16z post / TechCrunch)
- Passes the **India context sanity check**:
  - Payment rails exist (UPI / cards / COD)
  - Legal category is non-toxic (no gambling, no lending without NBFC licence, no health claims without DCGI)
  - Not blocked by a dominant Indian incumbent already capturing this exact niche (Zomato for food, PhonePe for UPI, etc.)
- **Distinct** from every published idea in `ideas/` in the last 60 days (no near-duplicates; compare slug + core pitch)

## Output contract

For a passing idea, generator writes one markdown file to `ideas/YYYY-MM-DD-<slug>.md` matching the schema in `generator/IDEA_SCHEMA.md`.

For a failing idea, generator writes **nothing**. If all 3 candidates of a day fail, the trigger logs "no-publish" and exits without a commit — keep the leaderboard signal-dense.

## Calibration examples

| Idea sketch                                              | 1  | 2  | 3  | 4  | 5  | 6  | 7  | Total | Verdict   |
|----------------------------------------------------------|---:|---:|---:|---:|---:|---:|---:|------:|-----------|
| UPI autopay for gym memberships (B2B2C)                  | 14 | 12 |  8 | 12 | 10 | 12 |  8 |    76 | Publish   |
| AI copilot for GST return filing (Tier-2 CAs)            | 18 | 11 |  7 | 10 | 13 | 13 |  6 |    78 | Publish   |
| Hyperlocal dating app for a single city                  | 10 |  8 |  7 |  6 |  5 |  7 |  7 |    50 | Reject    |
| Crypto-settled remittance corridor India↔UAE             | 16 |  4 |  4 | 10 | 10 |  9 |  2 |    55 | Reject (regulatory) |
| Instagram-native thrift marketplace for Gen-Z            | 12 | 13 |  9 | 13 |  6 |  9 |  9 |    71 | Publish   |

## Anti-patterns (auto-reject regardless of score)

- Anything requiring ≥₹50L upfront hardware or inventory
- Anything requiring RBI/SEBI/NBFC/insurance licence to operate legally
- Pure copycats of dominant Indian players (another food delivery, another UPI app, another edtech YouTube)
- Ideas whose trend source is older than 90 days
- Ideas that depend on a single platform's unpublished API
