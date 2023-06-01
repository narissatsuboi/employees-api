import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./ddbClient.js"
import { employeeTableInput } from "./employeeTableInput.js";

export const createTable = async () => {
  const command = new CreateTableCommand(employeeTableInput);
  try {
    const response = await client.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

createTable() 