import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./ddbClient.js"

/**
 * DynamoDB PutItem command to add a new employee to the Employees table.
 * @param {*} props 
 */
export const putItem = async ( props, id ) => {

  //  PutItemCommand input. Manager props nullable per specification.
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
    await client.send(command);
  } catch (err) {
    console.error(import.meta.url, err);
  }
};