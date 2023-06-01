import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./ddbClient.js"

const employeePutData = {
  TableName: "Employees",
  Item: {
    EmployeeID: {
      S: "0000001",
    },
    FirstName: {
      S: "Richard",
    }, 
    LastName: {
      S: "Roe",
    },
    StartDate: {
      S: "2021-01-01",
    },
    Country: {
      S: "US",
    },
    DepartmentID:{
      S: "Accounting"
    },
    Title: {
      S: "Accountant",
    },
    ManagerID: {
      S: "M000002",
    },
    ManagerName: {
      S: "Jane Doe",
    }

  }
}

export const putItem = async () => {
  const command = new PutItemCommand(employeePutData);
  try {
    const response = await client.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

putItem() 