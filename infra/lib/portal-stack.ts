import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";

interface PortalStackProps extends cdk.StackProps {
  domainNames?: string[];
  certificate?: acm.ICertificate;
  certificateArn?: string;
  hostedZoneDomain?: string;
}

export class PortalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: PortalStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "PortalBucket", {
      bucketName: `ideafactory-portal-${this.account}-${this.region}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      versioned: false,
      enforceSSL: true,
    });

    const oac = new cloudfront.S3OriginAccessControl(this, "PortalOac", {
      signing: cloudfront.Signing.SIGV4_ALWAYS,
    });

    const rewriteFn = new cloudfront.Function(this, "RewriteIndexFn", {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var req = event.request;
  var uri = req.uri;
  if (uri.endsWith('/')) {
    req.uri = uri + 'index.html';
  } else if (!uri.split('/').pop().includes('.')) {
    req.uri = uri + '/index.html';
  }
  return req;
}
      `.trim()),
      comment: "Map trailing-slash and extensionless URIs to index.html",
    });

    const distribution = new cloudfront.Distribution(this, "PortalDistribution", {
      comment: "ideaFactory portal",
      defaultRootObject: "index.html",
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      domainNames: props?.domainNames,
      certificate:
        props?.certificate ??
        (props?.certificateArn
          ? acm.Certificate.fromCertificateArn(this, "ImportedCert", props.certificateArn)
          : undefined),
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket, {
          originAccessControl: oac,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS,
        functionAssociations: [
          {
            function: rewriteFn,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      errorResponses: [
        { httpStatus: 403, responseHttpStatus: 404, responsePagePath: "/404.html", ttl: cdk.Duration.minutes(5) },
        { httpStatus: 404, responseHttpStatus: 404, responsePagePath: "/404.html", ttl: cdk.Duration.minutes(5) },
      ],
    });

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
        actions: ["s3:GetObject"],
        resources: [bucket.arnForObjects("*")],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
          },
        },
      })
    );

    if (props?.hostedZoneDomain && props?.domainNames?.length) {
      const zone = route53.HostedZone.fromLookup(this, "Zone", {
        domainName: props.hostedZoneDomain,
      });
      for (const name of props.domainNames) {
        const recordName = name === props.hostedZoneDomain ? undefined : name;
        new route53.ARecord(this, `Alias-${name.replace(/[^a-zA-Z0-9]/g, "-")}`, {
          zone,
          recordName,
          target: route53.RecordTarget.fromAlias(
            new targets.CloudFrontTarget(distribution)
          ),
        });
      }
    }

    new cdk.CfnOutput(this, "BucketName", { value: bucket.bucketName });
    new cdk.CfnOutput(this, "DistributionId", { value: distribution.distributionId });
    new cdk.CfnOutput(this, "CloudFrontDomain", {
      value: distribution.distributionDomainName,
      description: "Use this URL as the portal origin",
    });
  }
}
