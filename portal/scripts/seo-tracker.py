#!/usr/bin/env python3
"""
Google Search Console SEO Tracker for uniqueideas.in

SETUP (one-time):
  1. Go to https://console.cloud.google.com/
  2. Enable "Google Search Console API" in APIs & Services
  3. Create OAuth2 credentials → OAuth client ID → Desktop app
     Download JSON → save as .gsc/credentials.json
  4. Run once — it opens a browser for authorization
  5. Token saved to .gsc/token.json for future runs

  mkdir -p .gsc && chmod 700 .gsc
  cp ~/Downloads/client_secret_*.json .gsc/credentials.json
  python3 scripts/seo-tracker.py

  NOTE: Can reuse the same GCP project + credentials as createmygift.in
  (just authorize uniqueideas.in in Google Search Console first)

USAGE:
  python3 scripts/seo-tracker.py                  # Weekly report (last 7 days)
  python3 scripts/seo-tracker.py --days 28        # Last 28 days
  python3 scripts/seo-tracker.py --full           # Pull 500 pages + 500 queries
"""

import sys
import json
import argparse
from datetime import datetime, timedelta
from pathlib import Path

try:
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
except ImportError:
    print("Missing dependencies. Run:")
    print("  pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client")
    sys.exit(1)

SCOPES     = ['https://www.googleapis.com/auth/webmasters.readonly']
SITE_URL   = 'sc-domain:uniqueideas.in'
BASE_DIR   = Path(__file__).parent.parent
GSC_DIR    = BASE_DIR / '.gsc'
CREDS_PATH = GSC_DIR / 'credentials.json'
TOKEN_PATH = GSC_DIR / 'token.json'
MEMORY_DIR = BASE_DIR / 'memory'

# Quick-win thresholds
QUICKWIN_MIN_IMPRESSIONS = 20    # lower threshold — new site, fewer impressions
QUICKWIN_MAX_CTR         = 0.02  # CTR below 2% = opportunity
QUICKWIN_MAX_POSITION    = 30    # within reach

# Keyword clusters to monitor for cannibalisation
KEYWORD_CLUSTERS = {
    'birthday':     ['birthday gift', 'birthday present', 'birthday ideas'],
    'anniversary':  ['anniversary gift', 'anniversary ideas'],
    'kids':         ['gift for kids', 'kids gift', 'children gift', 'story box', 'kahaani box'],
    'personalized': ['personalized gift', 'personalised gift', 'custom gift'],
    'unique':       ['unique gift', 'unusual gift', 'different gift'],
    'fridge_magnet':['fridge magnet', 'musical magnet', 'photo magnet'],
}


def get_service():
    creds = None
    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDS_PATH.exists():
                print(f"Error: credentials not found at {CREDS_PATH}")
                print("Run setup steps in the script header first.")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(str(CREDS_PATH), SCOPES)
            creds = flow.run_local_server(port=0)
        GSC_DIR.mkdir(exist_ok=True)
        TOKEN_PATH.write_text(creds.to_json())
    return build('searchconsole', 'v1', credentials=creds)


def gsc_query(service, body):
    body['siteUrl'] = SITE_URL
    return service.searchanalytics().query(siteUrl=SITE_URL, body=body).execute().get('rows', [])


def fetch_totals(service, start_date, end_date):
    rows = gsc_query(service, {'startDate': start_date, 'endDate': end_date, 'dimensions': []})
    if rows:
        r = rows[0]
        return {
            'clicks': int(r.get('clicks', 0)),
            'impressions': int(r.get('impressions', 0)),
            'ctr': r.get('ctr', 0),
            'position': r.get('position', 0),
        }
    return {'clicks': 0, 'impressions': 0, 'ctr': 0, 'position': 0}


def fetch_pages(service, start_date, end_date, limit=50):
    return gsc_query(service, {
        'startDate': start_date, 'endDate': end_date,
        'dimensions': ['page'], 'rowLimit': limit,
        'orderBy': [{'fieldName': 'impressions', 'sortOrder': 'DESCENDING'}],
    })


def fetch_queries(service, start_date, end_date, limit=100):
    return gsc_query(service, {
        'startDate': start_date, 'endDate': end_date,
        'dimensions': ['query'], 'rowLimit': limit,
        'orderBy': [{'fieldName': 'impressions', 'sortOrder': 'DESCENDING'}],
    })


def shorten(url):
    for prefix in ['https://uniqueideas.in', 'http://uniqueideas.in']:
        url = url.replace(prefix, '')
    return url or '/'


def fmt_pct(v):
    return f"{v * 100:.1f}%"


def delta(curr, prev):
    if prev == 0:
        return f'+{curr}' if curr > 0 else '—'
    d = ((curr - prev) / prev) * 100
    return f'{"+" if d >= 0 else ""}{d:.1f}%'


def detect_cannibals(pages):
    results = {}
    for cluster_name, terms in KEYWORD_CLUSTERS.items():
        matching = []
        for row in pages:
            slug = shorten(row['keys'][0]).lower()
            if any(t in slug for t in terms):
                matching.append({
                    'page': shorten(row['keys'][0]),
                    'clicks': int(row.get('clicks', 0)),
                    'impressions': int(row.get('impressions', 0)),
                    'position': row.get('position', 0),
                })
        if len(matching) > 1:
            results[cluster_name] = matching
    return results


def generate_report(days=7, full=False):
    service = get_service()

    today      = datetime.utcnow().date()
    end_date   = str(today - timedelta(days=3))
    start_date = str(today - timedelta(days=days + 3))
    prev_start = str(today - timedelta(days=days * 2 + 3))
    prev_end   = str(today - timedelta(days=days + 4))

    print(f"Fetching GSC data for {SITE_URL}")
    print(f"  Current:  {start_date} → {end_date}")
    print(f"  Previous: {prev_start} → {prev_end}")

    limit   = 500 if full else 50
    current  = fetch_totals(service, start_date, end_date)
    previous = fetch_totals(service, prev_start, prev_end)
    pages    = fetch_pages(service, start_date, end_date, limit=limit)
    queries  = fetch_queries(service, start_date, end_date, limit=limit * 2)

    report_date = today.strftime('%Y-%m-%d')
    lines = [
        f'# SEO Report — uniqueideas.in — {report_date} (last {days} days)',
        f'> Site: {SITE_URL}  |  Period: {start_date} → {end_date}',
        '',
        '## 📊 Overall Performance',
        '',
        '| Metric | Current | Previous | Change |',
        '|--------|---------|----------|--------|',
        f"| Clicks      | {current['clicks']:,}      | {previous['clicks']:,}      | {delta(current['clicks'], previous['clicks'])} |",
        f"| Impressions | {current['impressions']:,} | {previous['impressions']:,} | {delta(current['impressions'], previous['impressions'])} |",
        f"| CTR         | {fmt_pct(current['ctr'])}  | {fmt_pct(previous['ctr'])}  | {delta(current['ctr'], previous['ctr'])} |",
        f"| Avg Position| {current['position']:.1f}  | {previous['position']:.1f}  | — |",
        '',
    ]

    # ── QUICK WINS ────────────────────────────────────────────────────────────
    quick_wins = sorted(
        [r for r in pages
         if int(r.get('impressions', 0)) >= QUICKWIN_MIN_IMPRESSIONS
         and r.get('ctr', 0) < QUICKWIN_MAX_CTR
         and r.get('position', 0) <= QUICKWIN_MAX_POSITION],
        key=lambda r: r.get('impressions', 0), reverse=True
    )

    lines += ['## 🎯 Quick Wins — High Impressions, Low CTR', '']
    if quick_wins:
        lines += [
            '> Showing in search but not getting clicks. Fix title/meta description.',
            '',
            '| Page | Impressions | CTR | Position | Action |',
            '|------|-------------|-----|----------|--------|',
        ]
        for r in quick_wins[:15]:
            pos = r.get('position', 0)
            action = (
                '🔴 Rewrite title/desc — page 1, not converting' if pos <= 10
                else '🟡 Improve content + internal links' if pos <= 20
                else '🟠 Build backlinks or consolidate page'
            )
            lines.append(
                f"| {shorten(r['keys'][0])} | {int(r.get('impressions', 0)):,} "
                f"| {fmt_pct(r.get('ctr', 0))} | {pos:.1f} | {action} |"
            )
    else:
        lines.append('_No quick wins found yet — site may be too new for GSC data._')
    lines.append('')

    # ── GIFTING KEYWORD OPPORTUNITIES ────────────────────────────────────────
    target_keywords = [
        'unique gifting ideas', 'unique gifts india', 'unique birthday gifts',
        'personalized gifts india', 'unique gifts for kids', 'screen free toys india',
        'musical fridge magnet', 'story box for kids', 'gifts for her india',
        'gifts for him india', 'unique anniversary gifts', 'unusual gifts india',
        'kahaani box', 'boxtales', 'rfid story box',
    ]
    lines += ['## 🎁 Target Keyword Tracking', '']
    lines += [
        '| Keyword | Impressions | Clicks | CTR | Position |',
        '|---------|-------------|--------|-----|----------|',
    ]
    query_map = {r['keys'][0].lower(): r for r in queries}
    found_any = False
    for kw in target_keywords:
        r = query_map.get(kw)
        if r:
            found_any = True
            lines.append(
                f"| {kw} | {int(r.get('impressions', 0)):,} | {int(r.get('clicks', 0)):,} "
                f"| {fmt_pct(r.get('ctr', 0))} | {r.get('position', 0):.1f} |"
            )
        else:
            lines.append(f'| {kw} | — | — | — | not ranking |')
    lines.append('')

    # ── CONTENT GAP (pos 11-30) ───────────────────────────────────────────────
    gap_queries = sorted(
        [r for r in queries
         if 11 <= r.get('position', 0) <= 30 and int(r.get('impressions', 0)) >= 5],
        key=lambda r: r.get('impressions', 0), reverse=True
    )
    lines += ['## 📈 Content Gap — Within Striking Distance of Page 1', '']
    if gap_queries:
        lines += [
            '| Query | Impressions | Position | Positions to Page 1 |',
            '|-------|-------------|----------|---------------------|',
        ]
        for r in gap_queries[:20]:
            pos = r.get('position', 0)
            lines.append(
                f"| {r['keys'][0]} | {int(r.get('impressions', 0)):,} "
                f"| {pos:.1f} | ~{int(pos - 10)} |"
            )
    else:
        lines.append('_No gap opportunities yet — check back once site has 4+ weeks of data._')
    lines.append('')

    # ── OCCASION PAGES PERFORMANCE ────────────────────────────────────────────
    occasion_slugs = [
        '/unique-gifts-for-birthday/', '/unique-gifts-for-kids/',
        '/personalized-gifts/', '/unique-anniversary-gifts/',
        '/unique-gifts-for-him/', '/unique-gifts-for-her/',
    ]
    lines += ['## 📄 Occasion Page Performance', '']
    lines += [
        '| Page | Impressions | Clicks | CTR | Avg Position |',
        '|------|-------------|--------|-----|--------------|',
    ]
    page_map = {shorten(r['keys'][0]): r for r in pages}
    for slug in occasion_slugs:
        r = page_map.get(slug)
        if r:
            lines.append(
                f"| {slug} | {int(r.get('impressions', 0)):,} | {int(r.get('clicks', 0)):,} "
                f"| {fmt_pct(r.get('ctr', 0))} | {r.get('position', 0):.1f} |"
            )
        else:
            lines.append(f'| {slug} | — | — | — | not indexed yet |')
    lines.append('')

    # ── TOP QUERIES ───────────────────────────────────────────────────────────
    lines += [
        '## 🔍 Top 30 Queries by Impressions',
        '',
        '| Query | Impressions | Clicks | CTR | Position |',
        '|-------|-------------|--------|-----|----------|',
    ]
    for r in queries[:30]:
        lines.append(
            f"| {r['keys'][0]} | {int(r.get('impressions', 0)):,} | {int(r.get('clicks', 0)):,} "
            f"| {fmt_pct(r.get('ctr', 0))} | {r.get('position', 0):.1f} |"
        )
    lines.append('')

    # ── CANNIBALISATION ───────────────────────────────────────────────────────
    cannibals = detect_cannibals(pages)
    lines += ['## ⚠️ Keyword Cannibalisation', '']
    if cannibals:
        for cluster, cpages in cannibals.items():
            lines.append(f'**{cluster.title()} cluster** — {len(cpages)} pages competing:')
            for p in sorted(cpages, key=lambda x: x['impressions'], reverse=True):
                lines.append(f"  - `{p['page']}` — {p['impressions']} imp, pos {p['position']:.1f}")
            lines.append('')
    else:
        lines.append('_No cannibalisation detected._')
        lines.append('')

    lines += [f'_Generated: {datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")}_', '']
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='GSC SEO tracker for uniqueideas.in')
    parser.add_argument('--days',   type=int,  default=7,    help='Days to report (default: 7)')
    parser.add_argument('--full',   action='store_true',     help='Pull 500 pages + 500 queries')
    parser.add_argument('--output', type=str,  default=None, help='Output file path')
    args = parser.parse_args()

    report = generate_report(days=args.days, full=args.full)

    today = datetime.utcnow().date().strftime('%Y-%m-%d')
    output_path = args.output or str(MEMORY_DIR / f'seo-report-{today}.md')
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    Path(output_path).write_text(report, encoding='utf-8')

    print(f"\nReport saved: {output_path}")
    print(report)


if __name__ == '__main__':
    main()
