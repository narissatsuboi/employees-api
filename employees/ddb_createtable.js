import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./ddbClient.js"

const employeeTableInput = {
  AttributeDefinitions: [
    {
      AttributeName: "EmployeeID",
      AttributeType: "S",
    },
  ],
  TableName: "Employees",
  KeySchema: [
    {
      AttributeName: "EmployeeID",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
}
export const createTable = async (input) => {
  const command = new CreateTableCommand(employeeTableInput);
  try {
    const response = await client.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.error(import.meta.url, err);
  }
};

createTable() 