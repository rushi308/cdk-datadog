import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsServiceFunction } from "./constructs/nodejs-service-function";
import * as path from "path";
import { Datadog } from "datadog-cdk-constructs-v2";

export class CdkDatadogStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Datadog intialization
    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: 85,
      extensionLayerVersion: 34,
      site: "datadoghq.eu",
      apiKey: "<YOUR_APP_API_KEY>",
    });

    // Sample lambda for monitoring datadog
    const datadogInitLambda = new NodejsServiceFunction(this, "DatadogInit", {
      functionName: "DatadogInit",
      entry: path.join(__dirname, "../src/lambda/datadoginit/index.ts"),
    });

    // Add lambdas whatever you want to see logs in datadog dashboard
    datadog.addLambdaFunctions([datadogInitLambda]);
  }
}
