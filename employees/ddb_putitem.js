import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./ddbClient.js"


export const putItem = async ( props ) => {

  const employeePutData = {
    TableName: "Employees",
    Item: {
      EmployeeID: {
        S: props.EmployeeID,
      },
      FirstName: {
        S: props.FirstName,
      }, 
      LastName: {
        S: props.LastName,
      },
      StartDate: {
        S: props.StartDate,
      },
      Country: {
        S: props.Country,
      },
      DepartmentID:{
        S: props.DepartmentID,
      },
      Title: {
        S: props.Title,
      },
      ManagerID: {
        NULL: true,
        S: props.ManagerID,
      },
      ManagerName: {
        NULL: true,
        S: props.ManagerName,
      }
    }
  }
  
  const command = new PutItemCommand(employeePutData);
  try {
    const response = await client.send(command);
    // return response;
  } catch (err) {
    console.error(err);
  }
};
