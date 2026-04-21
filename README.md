# ideaFactory

One India-viable startup idea, generated daily. Scored by a 100-point rubric. Ranked by your upvotes.

Each morning a Claude Code `/schedule` trigger scans fresh trend signals from Play Store, Product Hunt, Kickstarter, YC and a16z, drafts three candidate startups fit for a 1-5 person Indian team with ≤ ₹20 lakh capex, scores them, and publishes the winner (score ≥ 70) to this repo. A static Next.js portal on S3 + CloudFront renders them into an animated leaderboard, and a tiny API Gateway + Lambda + DynamoDB backend handles upvotes.

## Repo layout

```
ideaFactory/
├── ideas/                    # Daily-generated markdown, one idea per file
├── generator/                # The brain
│   ├── RUBRIC.md             # 100-point scoring framework + thresholds
│   ├── IDEA_SCHEMA.md        # Frontmatter + body contract for every idea
│   └── TRIGGER_PROMPT.md     # Paste into `/schedule` to create the daily cron
├── portal/                   # Next.js 15 static export — UI + leaderboard
│   ├── app/                  # App Router pages
│   ├── components/           # Leaderboard, IdeaRow, VoteButton, ScoreBadge
│   ├── lib/                  # Idea parsing, API client, fingerprint
│   └── scripts/
│       └── validate-ideas.mjs   # Fails CI if any idea breaks the schema
├── infra/                    # AWS CDK (TypeScript, region ap-south-1)
│   ├── bin/app.ts
│   ├── lib/portal-stack.ts   # S3 + CloudFront with OAC
│   ├── lib/votes-stack.ts    # DynamoDB + Lambda + HTTP API
│   └── lambda/votes/index.ts
├── scripts/
│   └── deploy-portal.sh      # Build + s3 sync + CloudFront invalidation
├── docs/
│   └── SCHEDULE_SETUP.md     # How to wire the daily trigger
└── .github/workflows/
    └── deploy-portal.yml     # Auto-deploys portal on push to main
```

## Quickstart

Prereqs: Node 22, AWS CLI configured with profile `giftshop` in `ap-south-1`, Claude Code CLI installed.

```bash
# 1. Install
cd infra && npm install && cd ..
cd portal && npm install && cd ..

# 2. Validate seed ideas
cd portal && npm run validate && cd ..

# 3. Run portal locally
cd portal && npm run dev
#  → http://localhost:3000  (voting disabled until API URL is set)

# 4. Deploy AWS infra (one-time)
cd infra
npm run bootstrap
npm run deploy:votes       # Get the API URL from CloudFormation outputs
npm run deploy:portal
cd ..

# 5. Deploy the portal
./scripts/deploy-portal.sh
#  → Open the CloudFront domain printed by IdfPortalStack

# 6. Set up the daily /schedule trigger
#    See docs/SCHEDULE_SETUP.md
```

## How scoring works

Every candidate idea is graded on seven weighted dimensions:

| Dimension                 | Weight |
|---------------------------|-------:|
| Market size (India TAM)   |     20 |
| Capital efficiency        |     15 |
| Team feasibility (1-5)    |     10 |
| Trend momentum (China/US) |     15 |
| Moat & defensibility      |     15 |
| Unit economics            |     15 |
| Time-to-MVP               |     10 |

Publication requires: total ≥ **70**, no single dimension = 0, at least one cited source observed within the last 90 days. Full rubric + calibration examples in [`generator/RUBRIC.md`](generator/RUBRIC.md).

## Voting

Client stores a random UUID in `localStorage` as a fingerprint. Lambda hashes fingerprint + IP + slug into a single voter key, stored in DynamoDB. One vote per idea per device; toggling a vote is fine. Per-IP rate limit of 20 votes/minute. No CAPTCHA, no sign-in.

## Costs (steady state)

| Component                     | Monthly   |
|-------------------------------|----------:|
| S3 + CloudFront (≤10GB/mo)    | ~₹10-40   |
| Lambda (1k votes/day)         | free tier |
| DynamoDB (on-demand, 1k/day)  | ~₹20-60   |
| Claude Code `/schedule` quota | included  |
| **Total**                     | ≤ ₹200/mo |

## Deploy pipeline

Every push to `main` that touches `portal/**` or `ideas/**` triggers `.github/workflows/deploy-portal.yml` — it builds Next.js, `s3 sync`s to the portal bucket, and invalidates CloudFront. Auth via OIDC role (set `AWS_DEPLOY_ROLE_ARN` in repo secrets).

See [`docs/SCHEDULE_SETUP.md`](docs/SCHEDULE_SETUP.md) for the daily trigger setup.
