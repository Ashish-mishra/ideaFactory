#!/bin/bash
# Frontend Deployment — UniqueIdeas.in
# Next.js SSG → S3 + CloudFront (same pattern as createmygift.in)
#
# Prerequisites:
#   aws configure --profile giftshop   (reuses the giftshop AWS profile)
#   S3_BUCKET and CF_DISTRIBUTION_ID must be set below after infra is provisioned

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

AWS_PROFILE=giftshop
S3_BUCKET=ideafactory-portal-158422796278-ap-south-1
CF_DISTRIBUTION_ID=E1YEDFKCI9SMPU

cd "$SCRIPT_DIR/.."
echo "📍 Running from: $(pwd)"

# ── 1. Build ──────────────────────────────────────────────────────────────────
echo ""
echo "🏗️  Building (next build)..."
npm run build
echo "✅ Build complete. Output in: out/"

# ── 2. Hashed assets — immutable 1-year cache ────────────────────────────────
echo ""
echo "📤 Uploading _next/static/ with 1-year immutable cache..."
AWS_PROFILE=$AWS_PROFILE aws s3 sync out/_next/static/ s3://$S3_BUCKET/_next/static/ \
  --cache-control "public, max-age=31536000, immutable" \
  --size-only

# ── 3. HTML pages — no cache ─────────────────────────────────────────────────
echo ""
echo "📤 Uploading HTML pages (no-cache)..."
AWS_PROFILE=$AWS_PROFILE aws s3 sync out/ s3://$S3_BUCKET/ \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8" \
  --delete

# ── 4. Next.js data JSON — no cache ──────────────────────────────────────────
if [ -d "out/_next/data" ]; then
  echo ""
  echo "📤 Uploading _next/data/ (no-cache)..."
  AWS_PROFILE=$AWS_PROFILE aws s3 sync out/_next/data/ s3://$S3_BUCKET/_next/data/ \
    --cache-control "no-cache, no-store, must-revalidate" \
    --delete
fi

# ── 5a. Sitemap + robots — explicit content-type (GSC requires application/xml) ─
echo ""
echo "📤 Uploading sitemap.xml and robots.txt..."
AWS_PROFILE=$AWS_PROFILE aws s3 cp out/sitemap.xml s3://$S3_BUCKET/sitemap.xml \
  --cache-control "public, max-age=86400" \
  --content-type "application/xml; charset=utf-8"
AWS_PROFILE=$AWS_PROFILE aws s3 cp out/robots.txt s3://$S3_BUCKET/robots.txt \
  --cache-control "public, max-age=86400" \
  --content-type "text/plain"

# ── 5b. Public images & other assets — 1-year cache ──────────────────────────
echo ""
echo "📤 Uploading public assets (1-year cache)..."
AWS_PROFILE=$AWS_PROFILE aws s3 sync out/ s3://$S3_BUCKET/ \
  --exclude "_next/*" \
  --exclude "*.html" \
  --exclude "sitemap.xml" \
  --exclude "robots.txt" \
  --cache-control "public, max-age=31536000" \
  --delete

# ── 6. CloudFront URL-rewrite function ───────────────────────────────────────
echo ""
echo "🔧 Deploying CloudFront URL-rewrite function..."
CF_FUNCTION_NAME="uniqueideas-url-rewrite"
FUNCTION_CODE_FILE="$SCRIPT_DIR/cloudfront-url-rewrite.js"

EXISTING_ETAG=$(AWS_PROFILE=$AWS_PROFILE aws cloudfront describe-function \
  --name "$CF_FUNCTION_NAME" \
  --query 'ETag' --output text 2>/dev/null || echo "")

if [ -z "$EXISTING_ETAG" ] || [ "$EXISTING_ETAG" = "None" ]; then
  echo "  → Creating CloudFront function '$CF_FUNCTION_NAME'..."
  AWS_PROFILE=$AWS_PROFILE aws cloudfront create-function \
    --name "$CF_FUNCTION_NAME" \
    --function-config "Comment=Next.js SSG URL rewriter,Runtime=cloudfront-js-2.0" \
    --function-code "fileb://$FUNCTION_CODE_FILE"
  echo "  ⚠️  Associate it in the AWS Console:"
  echo "     CloudFront → $CF_DISTRIBUTION_ID → Behaviors → /* → Function associations"
  echo "     Event type: Viewer Request"
else
  echo "  → Updating CloudFront function '$CF_FUNCTION_NAME'..."
  NEW_ETAG=$(AWS_PROFILE=$AWS_PROFILE aws cloudfront update-function \
    --name "$CF_FUNCTION_NAME" \
    --if-match "$EXISTING_ETAG" \
    --function-config "Comment=Next.js SSG URL rewriter,Runtime=cloudfront-js-2.0" \
    --function-code "fileb://$FUNCTION_CODE_FILE" \
    --query 'ETag' --output text)
  AWS_PROFILE=$AWS_PROFILE aws cloudfront publish-function \
    --name "$CF_FUNCTION_NAME" \
    --if-match "$NEW_ETAG"
  echo "  ✅ Function updated and published."
fi

# ── 7. CloudFront invalidation ────────────────────────────────────────────────
echo ""
echo "🔄 Invalidating CloudFront cache..."
INVALIDATION_ID=$(AWS_PROFILE=$AWS_PROFILE aws cloudfront create-invalidation \
  --distribution-id $CF_DISTRIBUTION_ID \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)
echo "✅ Invalidation: $INVALIDATION_ID"

echo ""
echo "🎉 Deployment complete!"
echo "🌐 https://uniqueideas.in"
