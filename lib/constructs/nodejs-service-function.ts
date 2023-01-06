import * as lambda from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
  SourceMapMode,
} from "aws-cdk-lib/aws-lambda-nodejs";
import * as logs from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

type NodejsServiceFunctionProps = NodejsFunctionProps;

export class NodejsServiceFunction extends NodejsFunction {
  constructor(scope: Construct, id: string, props: NodejsServiceFunctionProps) {
    const runtime = props.runtime ?? lambda.Runtime.NODEJS_16_X;
    const handler = "handler";
    const bundling = {
      forceDockerBundling: false,
      sourceMap: true,
      sourceMapMode: SourceMapMode.INLINE,
      sourcesContent: false,
      externalModules: ["aws-sdk", "datadog-lambda-js", "dd-trace"],
    };
    const logRetention = logs.RetentionDays.THREE_MONTHS;
    const tracing = lambda.Tracing.ACTIVE;
    const entry = props.entry;

    super(scope, id, {
      ...props,
      tracing,
      runtime,
      handler,
      bundling,
      logRetention,
      entry,
    });
    this.addEnvironment("LOG_LEVEL", "40");
  }
}
