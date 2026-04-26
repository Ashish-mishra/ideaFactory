import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

interface Props extends cdk.StackProps {
  domainName: string;
}

export class PortalCertStack extends cdk.Stack {
  public readonly certificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    this.certificate = new acm.Certificate(this, "PortalCert", {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(),
    });

    new cdk.CfnOutput(this, "CertificateArn", {
      value: this.certificate.certificateArn,
      description: "ACM certificate ARN (us-east-1, for CloudFront use)",
    });
  }
}
