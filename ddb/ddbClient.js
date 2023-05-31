import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const ddbClientConfig = {
    region: "us-east-1",
}

export const client = new DynamoDBClient(ddbClientConfig)
