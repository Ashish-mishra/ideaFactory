#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PortalStack } from "../lib/portal-stack";
import { VotesStack } from "../lib/votes-stack";
import { GitHubOidcStack } from "../lib/github-oidc-stack";

const app = new cdk.App();

const account = process.env.CDK_DEFAULT_ACCOUNT;
const env = {
  account,
  region: process.env.CDK_DEFAULT_REGION ?? "ap-south-1",
};

const DOMAIN = "uniqueideas.in";
const CERT_ARN = "arn:aws:acm:us-east-1:158422796278:certificate/f0203ef1-b373-4ebb-8b56-6b56427417f4";

new PortalStack(app, "IdfPortalStack", {
  env,
  description: "ideaFactory — S3 static bucket + CloudFront distribution",
  domainNames: [DOMAIN, `*.${DOMAIN}`],
  certificateArn: CERT_ARN,
});

new VotesStack(app, "IdfVotesStack", {
  env,
  description: "ideaFactory — DynamoDB + Lambda + API Gateway for votes",
});

new GitHubOidcStack(app, "IdfGitHubOidcStack", {
  env,
  githubOwner: "Ashish-mishra",
  githubRepo: "ideaFactory",
  description: "ideaFactory — GitHub Actions OIDC provider + deploy role",
});
