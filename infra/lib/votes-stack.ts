import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigw from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as path from "node:path";

export class VotesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "VotesTable", {
      tableName: "ideafactory-votes",
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: "ttl",
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      pointInTimeRecovery: true,
    });

    const fn = new nodejs.NodejsFunction(this, "VotesFn", {
      entry: path.join(__dirname, "..", "lambda", "votes", "index.ts"),
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(6),
      architecture: lambda.Architecture.ARM_64,
      environment: {
        VOTES_TABLE: table.tableName,
        CORS_ORIGIN: "*",
        IP_SALT: process.env.IP_SALT ?? "idf-default-salt-change-me",
      },
      bundling: {
        minify: true,
        sourceMap: false,
        externalModules: ["@aws-sdk/*"],
      },
    });
    table.grantReadWriteData(fn);

    const api = new apigw.HttpApi(this, "VotesApi", {
      apiName: "ideafactory-votes",
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [apigw.CorsHttpMethod.GET, apigw.CorsHttpMethod.POST, apigw.CorsHttpMethod.OPTIONS],
        allowHeaders: ["Content-Type"],
        maxAge: cdk.Duration.hours(1),
      },
      createDefaultStage: true,
    });
    const integration = new integrations.HttpLambdaIntegration("VotesIntegration", fn);
    api.addRoutes({ path: "/counts", methods: [apigw.HttpMethod.GET], integration });
    api.addRoutes({ path: "/vote", methods: [apigw.HttpMethod.POST], integration });

    new cdk.CfnOutput(this, "VotesApiUrl", {
      value: api.apiEndpoint,
      description: "Set NEXT_PUBLIC_VOTES_API to this URL",
    });
    new cdk.CfnOutput(this, "TableName", { value: table.tableName });
  }
}
