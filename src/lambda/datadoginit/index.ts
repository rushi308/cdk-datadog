import { Context } from "aws-lambda";
import middy from "@middy/core";
import logger from "../../utils/logger";
import { sendDistributionMetric } from "datadog-lambda-js";

const dataDogInit = async (event: any, context: Context) => {
  console.log(event, "EVENT From Lambda");
  logger.defaultMeta = {
    awsRequestId: context.awsRequestId,
  };

  sendDistributionMetric(
    "coffee.order_value", // Metric name
    16.87, // Metric value
    "product:hot-chocolate", // First tag
    "order:online" // Second tag
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from serverless!" }),
  };
};

export const handler = middy(dataDogInit);
