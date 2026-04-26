import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

interface Props extends cdk.StackProps {
  githubOwner: string;
  githubRepo: string;
}

export class GitHubOidcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const provider = new iam.OpenIdConnectProvider(this, "GitHubOidc", {
      url: "https://token.actions.githubusercontent.com",
      clientIds: ["sts.amazonaws.com"],
    });

    const subjectClaim = `repo:${props.githubOwner}/${props.githubRepo}:*`;

    const deployRole = new iam.Role(this, "GitHubDeployRole", {
      roleName: "ideafactory-github-deploy",
      assumedBy: new iam.FederatedPrincipal(
        provider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          },
          StringLike: {
            "token.actions.githubusercontent.com:sub": subjectClaim,
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
      description: `GitHub Actions deploy role for ${props.githubOwner}/${props.githubRepo}`,
      maxSessionDuration: cdk.Duration.hours(1),
    });

    const portalBucketArn = `arn:aws:s3:::ideafactory-portal-${this.account}-${this.region}`;

    deployRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "ReadStackOutputs",
        effect: iam.Effect.ALLOW,
        actions: ["cloudformation:DescribeStacks"],
        resources: [
          `arn:aws:cloudformation:${this.region}:${this.account}:stack/IdfPortalStack/*`,
          `arn:aws:cloudformation:${this.region}:${this.account}:stack/IdfVotesStack/*`,
        ],
      })
    );

    deployRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "PortalBucketWrite",
        effect: iam.Effect.ALLOW,
        actions: [
          "s3:ListBucket",
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:PutObjectAcl",
        ],
        resources: [portalBucketArn, `${portalBucketArn}/*`],
      })
    );

    deployRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "CloudFrontInvalidate",
        effect: iam.Effect.ALLOW,
        actions: [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation",
          "cloudfront:ListInvalidations",
        ],
        resources: [`arn:aws:cloudfront::${this.account}:distribution/*`],
      })
    );

    new cdk.CfnOutput(this, "DeployRoleArn", {
      value: deployRole.roleArn,
      description: "Add this as AWS_DEPLOY_ROLE_ARN secret in GitHub repo settings",
    });
  }
}
