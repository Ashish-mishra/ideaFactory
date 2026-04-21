#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PortalStack } from "../lib/portal-stack";
import { VotesStack } from "../lib/votes-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? "ap-south-1",
};

new PortalStack(app, "IdfPortalStack", {
  env,
  description: "ideaFactory — S3 static bucket + CloudFront distribution",
});

new VotesStack(app, "IdfVotesStack", {
  env,
  description: "ideaFactory — DynamoDB + Lambda + API Gateway for votes",
});
