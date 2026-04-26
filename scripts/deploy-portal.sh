#!/usr/bin/env bash
#
# Build the Next.js portal and deploy it to S3 + invalidate CloudFront.
#
# Requires:
#   - AWS CLI configured with profile `giftshop` (set via AWS_PROFILE env)
#   - Portal stack already deployed (via `cd infra && npm run deploy:portal`)
#   - Votes stack already deployed, with API URL exported to env
#
# Usage:
#   ./scripts/deploy-portal.sh
#   NEXT_PUBLIC_VOTES_API=https://abc123.execute-api.ap-south-1.amazonaws.com ./scripts/deploy-portal.sh

set -euo pipefail

AWS_PROFILE=${AWS_PROFILE:-giftshop}
REGION=${AWS_REGION:-ap-south-1}
ROOT=$(cd "$(dirname "$0")/.." && pwd)

cd "$ROOT/infra"

echo "→ Reading stack outputs"
BUCKET=$(aws cloudformation describe-stacks \
  --stack-name IdfPortalStack \
  --profile "$AWS_PROFILE" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
  --output text)
DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name IdfPortalStack \
  --profile "$AWS_PROFILE" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
  --output text)

if [ -z "${NEXT_PUBLIC_VOTES_API:-}" ]; then
  NEXT_PUBLIC_VOTES_API=$(aws cloudformation describe-stacks \
    --stack-name IdfVotesStack \
    --profile "$AWS_PROFILE" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='VotesApiUrl'].OutputValue" \
    --output text 2>/dev/null || echo "")
fi
if [ -z "$NEXT_PUBLIC_VOTES_API" ]; then
  echo "✗ NEXT_PUBLIC_VOTES_API is empty. IdfVotesStack output 'VotesApiUrl' not found." >&2
  echo "  Deploy the votes stack first (cd infra && npm run deploy:votes) or set NEXT_PUBLIC_VOTES_API explicitly." >&2
  exit 1
fi
export NEXT_PUBLIC_VOTES_API

echo "  bucket:     $BUCKET"
echo "  dist id:    $DIST_ID"
echo "  votes api:  ${NEXT_PUBLIC_VOTES_API:-<unset — voting disabled>}"

cd "$ROOT/portal"

npm install --no-audit --no-fund --silent

# --- Build 1: root (no basePath) ---
echo "→ Build 1/2: root (no basePath)"
rm -rf out/ .next/
unset BASE_PATH
npm run build

echo "→ Sync build 1 to s3://$BUCKET/ (root)"
aws s3 sync out/ "s3://$BUCKET/" \
  --delete \
  --cache-control "public, max-age=300, s-maxage=86400" \
  --exclude "_next/static/*" \
  --exclude "startups/*" \
  --profile "$AWS_PROFILE" \
  --region "$REGION"

aws s3 sync out/_next/static/ "s3://$BUCKET/_next/static/" \
  --cache-control "public, max-age=31536000, immutable" \
  --profile "$AWS_PROFILE" \
  --region "$REGION"

# --- Build 2: /startups (basePath=/startups) ---
echo "→ Build 2/2: /startups (basePath=/startups)"
rm -rf out/ .next/
BASE_PATH=/startups npm run build

echo "→ Sync build 2 to s3://$BUCKET/startups/"
aws s3 sync out/ "s3://$BUCKET/startups/" \
  --delete \
  --cache-control "public, max-age=300, s-maxage=86400" \
  --exclude "_next/static/*" \
  --profile "$AWS_PROFILE" \
  --region "$REGION"

aws s3 sync out/_next/static/ "s3://$BUCKET/startups/_next/static/" \
  --cache-control "public, max-age=31536000, immutable" \
  --profile "$AWS_PROFILE" \
  --region "$REGION"

echo "→ Invalidating CloudFront"
aws cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --paths "/*" \
  --profile "$AWS_PROFILE" \
  --region "$REGION" \
  --output text \
  --query "Invalidation.Id"

echo "✓ Deployed. CloudFront propagation usually takes ~60 seconds."
