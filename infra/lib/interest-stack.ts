import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as apigw from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as path from "node:path";

/** Collects "notify me" WhatsApp numbers for gift concepts and alerts the owner via WhatsApp Cloud API. */
export class InterestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "InterestTable", {
      tableName: "ideafactory-interest",
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: "ttl",
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      pointInTimeRecovery: true,
    });

    // Email alerts. The address comes from the ALERT_EMAIL env var at deploy time, not from the repo.
    const topic = new sns.Topic(this, "InterestAlerts", { displayName: "uniqueideas.in interest alerts" });
    if (process.env.ALERT_EMAIL) topic.addSubscription(new subs.EmailSubscription(process.env.ALERT_EMAIL));

    const ssmPrefix = "/gift-shop/prod";
    const fn = new nodejs.NodejsFunction(this, "InterestFn", {
      entry: path.join(__dirname, "..", "lambda", "interest", "index.ts"),
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      architecture: lambda.Architecture.ARM_64,
      environment: {
        INTEREST_TABLE: table.tableName,
        ALERT_TOPIC_ARN: topic.topicArn,
        WHATSAPP_SSM_PREFIX: ssmPrefix,
        WHATSAPP_TEMPLATE: "new_gift_interest",
        ALLOWED_ORIGINS: "https://uniqueideas.in,http://localhost:3100",
        IP_SALT: process.env.IP_SALT ?? "idf-default-salt-change-me",
      },
      bundling: { minify: true, sourceMap: false, externalModules: ["@aws-sdk/*"] },
    });
    table.grantReadWriteData(fn);
    topic.grantPublish(fn);
    fn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ssm:GetParameter"],
        resources: [
          `arn:aws:ssm:${this.region}:${this.account}:parameter${ssmPrefix}/whatsapp-access-token`,
          `arn:aws:ssm:${this.region}:${this.account}:parameter${ssmPrefix}/whatsapp-phone-id`,
          `arn:aws:ssm:${this.region}:${this.account}:parameter${ssmPrefix}/whatsapp-business-number`,
        ],
      })
    );

    const api = new apigw.HttpApi(this, "InterestApi", {
      apiName: "ideafactory-interest",
      corsPreflight: {
        allowOrigins: ["https://uniqueideas.in", "http://localhost:3100"],
        allowMethods: [apigw.CorsHttpMethod.POST, apigw.CorsHttpMethod.OPTIONS],
        allowHeaders: ["Content-Type"],
        maxAge: cdk.Duration.hours(1),
      },
      createDefaultStage: true,
    });
    api.addRoutes({
      path: "/interest",
      methods: [apigw.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration("InterestIntegration", fn),
    });

    new cdk.CfnOutput(this, "InterestApiUrl", { value: api.apiEndpoint });
    new cdk.CfnOutput(this, "InterestTableName", { value: table.tableName });
  }
}
