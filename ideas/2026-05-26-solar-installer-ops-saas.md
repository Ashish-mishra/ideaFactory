---
title: "Solar Installer Ops SaaS for India's Rooftop Revolution"
slug: solar-installer-ops-saas
date: 2026-05-26
category: climate
pitch: "SaaS for India's small rooftop solar installers to manage quotes, EMI tie-ups, and live monitoring — replacing WhatsApp chaos"
score:
  market: 14
  capital: 13
  team: 8
  trend: 13
  moat: 10
  economics: 12
  speed: 7
  total: 77
capex_inr_lakh: 12
team_size: 3
time_to_mvp_weeks: 9
sources:
  - label: "TechCrunch — SolarSquare in talks to raise $60M as India rooftop solar draws VC interest"
    url: "https://techcrunch.com/2026/05/23/solarsquare-in-talks-to-raise-up-to-60m-as-indias-rooftop-solar-market-draws-major-vc-interest/"
    observed_on: 2026-05-23
  - label: "TechCrunch — Scapia travel fintech doubles valuation to $500M+"
    url: "https://techcrunch.com/2026/05/20/indian-travel-fintech-scapia-more-than-doubles-valuation-to-over-500m-in-a-year/"
    observed_on: 2026-05-20
tags: [b2b, saas, recurring-revenue, climate, solar]
status: published
---

## Problem

India has 10,000+ small rooftop solar installers, yet almost none of them use any software — quotes go out over WhatsApp, EMI follow-ups live in notebooks, and post-installation monitoring requires calling the customer. As India races toward its 40 GW rooftop solar target, this operational chaos means installers lose deals, miss EMI renewals, and have no way to upsell maintenance contracts.

## Solution

A SaaS web app (and WhatsApp-bot companion) for small solar installers covering three flows: (1) **Quote Builder** — enter roof area, sanctioned load, and state subsidy; the app generates a branded PDF quote with ROI projection; (2) **EMI Linkage** — one-click integration with NBFC partners (Lendingkart, Ugro) to send loan application links to customers via WhatsApp; (3) **Monitoring Dashboard** — a lightweight device-agnostic panel that polls inverter APIs (Solis, SolarEdge, Growatt) and pushes monthly health reports to end-customers.

## Why Now

SolarSquare, a consumer-facing solar installer, is in talks to raise $60M (May 2026) — signalling that VC money is flooding into the supply chain, not yet into installer tooling. The PM Surya Ghar scheme increased DISCOM-approved installer count by 4× in 2024-25, creating a long tail of under-tooled operators hungry for professional software. NBFC solar lending disbursals grew 80% YoY in FY26, meaning the EMI linkage feature has immediate pull.

## Target User

First 1,000 customers: solar installation companies in Tier-1 and Tier-2 cities (Pune, Ahmedabad, Jaipur, Coimbatore, Lucknow) with 2–15 employees, ₹50L–₹5Cr annual revenue, currently managing 10–50 installations per month over WhatsApp and Excel. Acquisition trigger: they've just lost a deal to a competitor who offered an on-the-spot ROI PDF.

## Business Model

Monthly SaaS subscription at ₹2,499/month per installer (annual plan ₹24,999). Free tier capped at 3 quotes/month to drive trial. Additional revenue via NBFC referral fee (0.5–1% of disbursed loan, passed through API). At 500 paying installers → ₹1.5Cr ARR. Gross margin ~78% (cloud hosting + WhatsApp API costs ~₹550/installer/month).

## Competitive Landscape

- **Direct (India):** None yet in micro-installer SaaS; SolarSquare is a consumer brand, not a tooling vendor; Sunpure and Waaree serve enterprise.
- **Direct (global reference):** Scoop Solar (Australia/US) and Aurora Solar (US) address the same problem but are priced for large installers ($300–500/month) and have no India localisation.
- **Why we win:** India-specific subsidy database, regional language PDF quotes (Hindi/Gujarati/Tamil), UPI-native payment flows, and NBFC API integrations that foreign tools will never build.

## 6-Month Plan

- **Month 1 (₹1.5L):** Founder sales — interview 30 Ahmedabad/Pune installers; validate quote + EMI pain; set up basic Rails/Django monolith + Postgres on Fly.io.
- **Month 2–3 (₹4L):** Quote Builder v1 with 5-state subsidy data, PDF generation, WhatsApp delivery via Twilio. Charge 10 beta installers ₹999/month.
- **Month 3–4 (₹3L):** EMI Linkage — Lendingkart API integration; customer WhatsApp loan flow. First referral revenue collected.
- **Month 4–5 (₹2L):** Monitoring Dashboard — Growatt + Solis inverter polling; monthly PDF report to end-customers; upsell AMC contract module.
- **Month 6 (₹1.5L):** Inside sales hire (₹20K/month stipend); target 80 paying accounts; expand to Rajasthan + Tamil Nadu subsidy data.
- **Total capex: ₹12L** (infra ₹2L, dev tools ₹1.5L, sales + ops ₹4.5L, contingency ₹4L).

## Risks

- **DISCOM API fragility:** Each state DISCOM has its own portal for subsidy status; scraping is brittle. Mitigation: build manual fallback entry with a future API roadmap as DISOMs open APIs under the PM Surya Ghar mission.
- **Low willingness-to-pay in long tail:** Installers doing <5 jobs/month may resist ₹2,499/month. Mitigation: free tier as a funnel; convert on the first EMI referral fee (aligns incentives).
- **SolarSquare / Waaree launches a white-label tool:** A funded player could copy the SaaS layer. Mitigation: move fast on NBFC partnerships and state-specific data moats before incumbents notice the opportunity.

## Score Breakdown

- **Market (14/20):** ~10,000 active installers today, growing to 40,000+ by 2028 with PM Surya Ghar mandates. ₹5,000 ARPU × 10,000 = ₹60Cr ARR ceiling today; ₹200Cr+ by 2028. Large but not yet ₹1,000Cr.
- **Capital (13/15):** Full MVP fits in ₹10–12L — web SaaS on commodity cloud, WhatsApp via Twilio, no hardware. Tight but achievable with a lean two-dev team.
- **Team (8/10):** Two full-stack devs + one founder with solar/energy background can ship in 9 weeks. No specialist hardware engineer needed; inverter APIs are REST.
- **Trend (13/15):** SolarSquare's $60M raise (May 2026) and PM Surya Ghar installer registration surge are live, documented signals from within the 90-day window.
- **Moat (10/15):** Switching cost grows as installer's customer portfolio, quote history, and monitoring data accumulate. NBFC referral relationships provide a secondary lock-in. Network effects are limited at launch.
- **Economics (12/15):** 78% gross margin at scale, EMI referral fees as bonus revenue, viral loop via branded customer PDFs. CAC via direct/phone sales is moderate (₹3,000–5,000 estimated); payback under 3 months at ₹2,499/month.
- **Speed (7/10):** Quote Builder + WhatsApp delivery in 8–9 weeks. Monitoring module adds 3–4 weeks; full MVP is ~9 weeks, just outside the 6-week ideal band.
