import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./ddbClient.js"

/**
 * Generates a pseudo-random ID number of a specified length 
 * and maximum value. 
 * @param {*} quantity 
 * @param {*} max 
 * @returns Number with 'quantity' number digits.
 */
const generateID = (quantity, max) => {
  const set = new Set()
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1)
  }
  return Array.from(set).join('')
}


/**
 * DynamoDB PutItem command to add a new employee to the Employees table.
 * @param {*} props 
 */
export const putItem = async ( props ) => {

  //  PutItemCommand input. Manager props nullable per specification.
  const employeePutData = {
    TableName: "Employees",
    Item: {
      EmployeeID: {
        S: generateID(7, 9),
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