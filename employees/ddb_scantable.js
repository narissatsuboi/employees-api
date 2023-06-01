import { ScanCommand } from "@aws-sdk/client-dynamodb"
import { client } from "./ddbClient.js"

export const scanTable = async () => {
    const request = {
      "TableName": "Employees",
    };
    const command = new ScanCommand(request);
    try {
      const response = await client.send(command);
      // console.log(response);
      response.Items.forEach(function (employee) {
        console.log(`${employee.FirstName.S} ${employee.LastName.S} (${employee.EmployeeID.S}) started on ${employee.StartDate.S}`)
      })
      return response;
    } catch (err) {
      console.error(err);
    }
  };
