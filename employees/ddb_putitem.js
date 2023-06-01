import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./ddbClient.js"

const employeePutData = {
  TableName: "Employees",
  Item: {
    EmployeeID: {
      S: "0000002",
    },
    FirstName: {
      S: "Geo",
    }, 
    LastName: {
      S: "Tsuboi",
    },
    StartDate: {
      S: "2016-04-11",
    },
    Country: {
      S: "US",
    },
    DepartmentID:{
      S: "Rocket Science"
    },
    Title: {
      S: "Rocket Scientist",
    },
    ManagerID: {
      S: "M000003",
    },
    ManagerName: {
      S: "Albert Einstein",
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
