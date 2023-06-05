import { ScanCommand,
         PutItemCommand,
         GetItemCommand,
         CreateTableCommand, } from "@aws-sdk/client-dynamodb"

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const clientConfig = {
    region: "us-east-1",
}
export const client = new DynamoDBClient(clientConfig)

export const getAllItems = async ( tableName ) => {
        const request = {
          "TableName": "Employees",
        };
        const command = new ScanCommand(request);
        try {
          const response = await client.send(command);
          response.Items.forEach(function (employee) {
            console.log(`${employee.FirstName.S} ${employee.LastName.S} (${employee.EmployeeID.S}) started on ${employee.StartDate.S}`)
          })
          return response;
        } catch (err) {
          console.error(err);
        }
}

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
}

export const getItem = async ( props ) => {

  const input = {
    "Key": {
      "EmployeeID": {
        "S": props
      }
    },
    "TableName": "Employees"
  };

  const command = new GetItemCommand(input);

  try {
    const response = await client.send(command)
    return response ? response : null
  } catch (err) {
    console.error(import.meta.url, err);
  }
};

export const createTable = async () => {
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

  const command = new CreateTableCommand(employeeTableInput);
  try {
    const response = await client.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.error(import.meta.url, err);
  }
};

// createTable(employeeTableInput)