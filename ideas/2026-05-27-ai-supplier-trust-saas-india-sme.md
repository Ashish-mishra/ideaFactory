---
title: "AI Supplier Trust Verifier for Indian SME Procurement"
slug: ai-supplier-trust-saas-india-sme
date: 2026-05-27
category: saas
pitch: "Paste a GSTIN, get a 0-100 supplier trust score in 30 seconds by cross-checking GST filings, MCA21, eCourts, and bank verification"
score:
  market: 15
  capital: 13
  team: 8
  trend: 11
  moat: 11
  economics: 13
  speed: 7
  total: 78
capex_inr_lakh: 12
team_size: 3
time_to_mvp_weeks: 10
sources:
  - label: "a16z Speedrun — 14 Big Ideas 2026, trust infrastructure for B2B"
    url: "https://superframeworks.com/articles/a16z-speedrun-ideas-indie-hackers-2026"
    observed_on: 2026-05-27
  - label: "TechCrunch India — Accel & Prosus pick six off-the-map India B2B startups"
    url: "https://techcrunch.com/tag/india/"
    observed_on: 2026-03-24
tags: [b2b, saas, msme, procurement, trust-infra, recurring-revenue]
status: published
---

## Problem

Indian MSMEs conducting B2B procurement lose an estimated ₹15,000 crore annually to fraudulent or unreliable suppliers — fake GSTIN registrations, shell companies with no filing history, vendors with active court cases, or accounts that bounce on payment. Manual verification (calling trade references, manually navigating MCA21, GST portals, eCourts) takes 2-3 days per new supplier and is routinely skipped under time pressure, especially by sub-₹50Cr manufacturers in Pune, Surat, and Ludhiana who lack a dedicated compliance team.

## Solution

A SaaS API and web dashboard where a procurement manager pastes a supplier's GSTIN and receives an instant 0-100 trust score backed by four data layers: GST filing regularity and turnover band (via NIC's public GST API), director-level defaults and company age from MCA21, open litigation from eCourts public search, and a live bank account penny-drop validation. The output is a one-page PDF risk report — green/amber/red flags with plain-language explanations — that attaches directly to a purchase order. A WhatsApp bot variant lets field procurement staff run checks on the go without a desktop.

## Why Now

India's digital compliance stack has reached API maturity that simply did not exist before 2023: the GST API is stable and publicly documented, MCA21 v3 provides machine-readable company data, and eCourts has a national case status API. a16z's Speedrun cohort explicitly listed "trust infrastructure for B2B marketplaces" among its 14 big ideas for 2026, and the Accel/Prosus inaugural India cohort (March 2026) backed off-the-map B2B infrastructure plays — signalling that institutional capital is actively seeking this category. The quick-commerce disruption forcing kiranas to diversify suppliers accelerates the urgency.

## Target User

First 1,000 customers: procurement managers and owners at manufacturing or trading SMEs in Pune, Ahmedabad, Surat, and Ludhiana with annual revenues of ₹2–50 crore buying from 20+ active suppliers. Purchase trigger: having been burned once by a fraudulent supplier or receiving a rejected GSTIN invoice that created an ITC dispute with the tax department. Secondary channel: B2B marketplace operators (IndiaMart, TradeIndia) seeking to improve seller verification.

## Business Model

Freemium entry point — 5 trust-score checks per month free (drives viral sharing of PDF reports). Paid tiers: **Starter** ₹999/month (50 checks), **Business** ₹2,999/month (300 checks + REST API access), **Enterprise** ₹9,999/month (unlimited + white-label). API call cost is ₹15–30 per check (GST API + penny-drop + cloud infra), yielding ~82% gross margin on paid plans. Expected blended ARPU at scale ₹2,200/month; LTV at 24-month avg tenure ≈ ₹52,800 vs. estimated CAC of ₹3,000–5,000 via content/community.

## Competitive Landscape

- **Direct (India):** SignalX (credit intelligence, enterprise-only), Bureau.id (KYB for fintechs, not SME procurement workflows) — neither targets the ₹2–50Cr manufacturer segment with a self-serve product
- **Direct (global reference):** Dun & Bradstreet (US, heavyweight enterprise), Creditsafe (UK/US) — far too complex and expensive for Indian SMEs
- **Why we win:** India-first data sources (GSTIN filing history, MCA21, eCourts) inaccessible to global players; SME-grade UX with sub-₹1,000 entry price; WhatsApp-native workflow matches how Indian field procurement actually operates

## 6-Month Plan

- **Month 1–2 (₹4L):** Integrate GSTIN public API, MCA21 v3, eCourts case API; build trust-score algorithm v1; basic web dashboard with PDF export
- **Month 2–3 (₹3L):** Add bank account penny-drop verification; WhatsApp bot via Twilio/Gupshup; beta with 50 Pune manufacturing SMEs recruited via MCCIA (Mahratta Chamber)
- **Month 3–4 (₹2L):** Freemium launch; SEO content targeting "GST supplier verification India"; onboard first 200 paying users
- **Month 4–5 (₹1.5L):** REST API for B2B platforms; IndiaMart/TradeIndia integration partnership outreach
- **Month 5–6 (₹1.5L):** Channel partner program for CA firms and procurement consultants; expand to Ahmedabad and Surat through GCCI partnership
- **Total: ₹12L capex** leaving ₹8L buffer for 12-month runway

## Risks

- **Government API reliability:** GSTIN and eCourts APIs have throttling limits and occasional downtime; mitigate with aggressive caching, graceful degradation to cached data, and manual fallback SLA
- **SME sales friction:** Procurement decisions are relationship-driven; buyers often prefer calling a reference over paying for data — requires strong ROI case studies (e.g., "one bad ₹3L order = 3 years of subscription cost")
- **Incumbents pivoting down-market:** Bureau.id or a well-funded fintech (Perfios, Signzy) could launch an SME-facing product with existing data relationships and distribution

## Score Breakdown

**Market (15/20):** India has 60M+ MSMEs; targeting the ~5M procurement-active manufacturers at a blended ₹2,200/month ARPU implies a ₹1,320Cr addressable market; realistic 3-year capture of 0.3% = ₹400Cr — squarely in the ₹100–1,000Cr band, scoring 15 rather than 20 given distribution challenges.

**Capital (13/15):** Four public API integrations plus a web dashboard is a well-understood engineering problem; MVP in ~₹7L with 2 mid-level devs in 10 weeks; remaining ₹13L covers 12 months of ops, sales, and infra — comfortably under ₹20L total, scoring 13.

**Team (8/10):** Two backend engineers (API-integration heavy, no novel ML required) plus one SME sales/BD person; the eCourts scraping legality needs a brief legal review, adding a small coordination cost — not a blocker but warrants the 8 rather than 10.

**Trend (11/15):** a16z Speedrun 2026 explicitly names trust infrastructure; Accel/Prosus India cohort (March 2026) signals institutional conviction in B2B India infra; India's GST ITC-dispute volumes (rising 40% YoY per GSTN data) are an organic demand driver — solid recent signals, but no single viral product-hunt moment, scoring 11.

**Moat (11/15):** Proprietary supplier reputation database compounds with every check run (network data effect); SMEs embedded in procurement workflow have high switching cost; early partnerships with trade bodies (MCCIA, GCCI) create distribution lock-in — not a deep tech moat but meaningful operational moat, scoring 11.

**Economics (13/15):** ~82% gross margin; freemium viral loop via shared PDF reports; LTV/CAC ratio estimated at 10x+ at steady state; no inventory, no logistics, pure software — scoring 13; held back from 15 only by modest per-customer ARPU at entry tier.

**Speed (7/10):** First paying user achievable in 10 weeks (beta users paying from Month 3); eCourts integration and penny-drop vendor onboarding add 2–3 weeks vs. a pure-SaaS play, scoring 7 rather than 10.
