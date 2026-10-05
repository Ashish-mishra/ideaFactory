#!/bin/bash
# SEO Weekly Report — uniqueideas.in
# Runs GSC tracker and sends summary to Telegram
# Usage: bash scripts/seo-weekly-report.sh [--days 7]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DAYS=${1:-7}

cd "$PROJECT_DIR"

TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-7393640407}"

echo "[seo-report] Running GSC tracker for uniqueideas.in..."
REPORT_DATE=$(date +%Y-%m-%d)
REPORT_FILE="memory/seo-report-${REPORT_DATE}.md"

mkdir -p memory

if ! python3 scripts/seo-tracker.py --days "$DAYS"; then
  echo "[seo-report] GSC tracker failed — check .gsc/credentials.json and token"
  exit 1
fi

if [[ ! -f "$REPORT_FILE" ]]; then
  echo "[seo-report] Report file not found: $REPORT_FILE"
  exit 1
fi

echo "[seo-report] Report generated: $REPORT_FILE"

if [[ -n "$TELEGRAM_BOT_TOKEN" ]]; then
  SUMMARY=$(awk '/## 📊 Overall Performance/{found=1} found{print; if(/^$/ && found>1) exit; found++}' "$REPORT_FILE" | head -12)

  MESSAGE="📊 *UniqueIdeas.in SEO Weekly — ${REPORT_DATE}*

\`\`\`
$(echo "$SUMMARY" | head -10)
\`\`\`

Full report: \`${REPORT_FILE}\`"

  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d "chat_id=${TELEGRAM_CHAT_ID}" \
    -d "text=${MESSAGE}" \
    -d "parse_mode=Markdown" \
    -d "disable_web_page_preview=true" \
    > /dev/null && echo "[seo-report] Sent to Telegram" || echo "[seo-report] Telegram send failed (non-fatal)"
else
  echo "[seo-report] TELEGRAM_BOT_TOKEN not set — skipping Telegram"
fi

echo "[seo-report] Done."
