---
title: "AI Vendor Fraud Screener for Indian MSMEs"
slug: ai-vendor-fraud-screener-msme
date: 2026-04-27
category: fintech
pitch: "WhatsApp-native AI that screens vendors for GST fraud and payment risk before MSMEs approve invoices"
score:
  market: 18
  capital: 13
  team: 9
  trend: 11
  moat: 12
  economics: 13
  speed: 8
  total: 84
capex_inr_lakh: 8
team_size: 3
time_to_mvp_weeks: 10
sources:
  - label: "TechCrunch — 16 Interesting Startups from YC W26 Demo Day (MouseCat fraud detection)"
    url: "https://techcrunch.com/2026/03/26/16-of-the-most-interesting-startups-from-yc-w26-demo-day/"
    observed_on: 2026-03-26
  - label: "Product Hunt — Best of Week April 20, 2026 (AI productivity tools)"
    url: "https://www.producthunt.com/leaderboard/weekly/2026/17"
    observed_on: 2026-04-26
tags: [b2b, fintech, anti-fraud, msme, recurring-revenue]
status: published
---

## Problem

Indian MSMEs lose an estimated ₹3,000–5,000 crore annually to vendor fraud — fake GSTINs, shell company invoices, and hijacked bank accounts slipped into supplier databases. Accounts teams approve payments based on a WhatsApp-forwarded invoice with zero cross-checks. With 63 million MSMEs and most having no dedicated finance controller, a single fraudulent payment can wipe out months of margin.

## Solution

VendorCheck is a WhatsApp-first SaaS tool: the accounts person forwards a vendor's GSTIN, bank account number, or UPI ID to the VendorCheck WhatsApp number and gets back a risk scorecard in under 30 seconds. The scorecard cross-references GST portal filing history (regularity, turnover mismatch), RBI bank account validation, a crowd-sourced blacklist of reported fraud vendors, and PAN linkage checks. A lightweight web dashboard lets owners review flagged vendors and approve or block payments with one click. The API version lets Tally/Zoho Books users run checks inline without leaving their accounting tool.

## Why Now

The GST portal's public API now exposes vendor filing regularity and turnover bands — data that wasn't accessible programmatically until 2024. YC W26's MouseCat (March 2026) proved that AI-powered fraud investigation is a fundable, scalable category even for small-business finance workflows. India's ongoing GST digitisation push means more MSME owners are now digitally literate enough to trust app-based verification over manual calls to a vendor's landline.

## Target User

First 1,000 customers: accounts managers and proprietors at manufacturing and trading MSMEs in Tier-1 industrial cities (Surat, Ludhiana, Rajkot, Coimbatore) with 10–100 active vendor relationships and 5–50 invoices per month. They are already on WhatsApp Business and use Tally. Purchase trigger: a recent near-miss or actual loss to a fake vendor, or a chartered accountant recommending the tool after spotting a suspicious invoice.

## Business Model

Monthly SaaS subscription at ₹1,499 per company for up to 500 vendor checks. High-volume companies (500–2,000 checks) pay ₹2,999/month. Enterprise Tally/Zoho Books plugin priced at ₹4,999/month per entity. Blended ARPU target ₹1,800/month. Gross margin ~78% (GST API calls ~₹0.50 each, LLM enrichment ~₹2/check, WhatsApp WABA ~₹0.25/message). CAC via chartered accountant partner channel at ₹2,000–3,000; LTV at 18-month average churn = ₹32,400, giving an LTV:CAC ratio of ~12:1.

## Competitive Landscape

- **Direct (India):** Signzy (enterprise KYC — ₹10L+ annual contracts, out of MSME price range); ClearTax GST verification (single-check lookups, no fraud scoring); no WhatsApp-native fraud screener exists
- **Direct (global reference):** MouseCat (YC W26, US) — AI fraud investigation for SMBs; Middesk (US) — business verification for fintechs
- **Why we win:** WhatsApp-first UX eliminates onboarding friction for non-technical accounts staff; India-specific GST data layer; crowd-sourced blacklist that becomes more accurate with every user, creating a defensible data moat incumbents cannot quickly replicate

## 6-Month Plan

- **Month 1 (₹1.5L):** Integrate GST portal public API and RBI IFSC/bank validation API; build WhatsApp WABA bot returning raw risk data; recruit 5 design partners via CA LinkedIn outreach
- **Month 2 (₹1.5L):** Build risk scoring model (GST filing regularity, UPI fraud patterns, crowd-sourced flag logic); ship web dashboard MVP; collect first 50 beta vendor checks
- **Month 3 (₹1.5L):** Launch paid pricing; onboard first 30 paying companies; iterate on false-positive rate; begin Tally plugin integration
- **Month 4 (₹1L):** Tally/Zoho Books API plugin beta; sign 5 CA firms as resellers; target 100 paying customers
- **Month 5 (₹1.5L):** Marketing spend across MSME WhatsApp groups, CA association webinars, and LinkedIn case studies; target 300 paying customers
- **Month 6 (₹1L):** Automate onboarding, reduce support load; reach ₹5L MRR (333 customers at ₹1,500 blended ARPU)
- **Total capex: ₹8L** (₹4L salaries for 2 devs × 6 months, ₹2L API/infra, ₹1L marketing, ₹1L legal/ops)

## Risks

- **GST API stability (High likelihood × High impact):** The government may rate-limit or restructure the public API without notice; mitigate by caching vendor data for 30 days and adding RazorpayX bank account verification as a parallel data source.
- **Blacklist cold-start (Medium × High):** The crowd-sourced blacklist is empty at launch, reducing the network-effect moat; mitigate by seeding with public court records for GST fraud convictions and partnering with CA firms who share anonymised fraud reports.
- **Enterprise competition (Low × High):** Signzy or a well-funded fintech could launch a downmarket product; mitigate by building WhatsApp habits and Tally integrations that create switching costs before any large entrant can respond.

## Score Breakdown

- **Market (18/20):** 63M MSMEs in India; even 0.1% penetration at ₹1,800 blended ARPU equals ₹1,130Cr ARR TAM. The pain is acute and frequent — not a marginal use case.
- **Capital (13/15):** MVP requires only GST API, WhatsApp WABA, and a scoring layer — buildable for ₹3L; full 12-month runway fits comfortably in ₹8L total. Deducted 2 for WABA approval lead time and API cost uncertainty at scale.
- **Team (9/10):** Two backend devs and one CA/BD hire can ship v1 in 10 weeks; WhatsApp WABA integration is well-documented. Deducted 1 for the domain nuance required to calibrate fraud scoring without excessive false positives.
- **Trend (11/15):** MouseCat at YC W26 (March 2026) validates AI fraud detection for SMB finance as a fundable category. Deducted 4 because the direct analog is US business verification, not Indian GST — the signal is directional, not a direct market proof.
- **Moat (12/15):** Crowd-sourced blacklist creates a data network effect; GST filing history integration is a real differentiator for India. Deducted 3 because the GST public API is accessible to any competitor, so raw data alone is not a moat.
- **Economics (13/15):** 78% gross margin, 12:1 LTV:CAC via the CA partner channel, and low expected churn once integrated into Tally workflows. Deducted 2 for CA channel dependency risk if reseller partners negotiate higher commissions.
- **Speed (8/10):** WhatsApp WABA onboarding takes 1–2 weeks; GST API integration is straightforward. First paying user reachable by week 10. Deducted 2 for WABA approval timeline uncertainty.
