import {
  ScanCommand,
  PutItemCommand,
  GetItemCommand,
  CreateTableCommand,
} from '@aws-sdk/client-dynamodb'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

const TABLE = "Employees"

/**
 * Instantiate DynamoDB client.
 */
const clientConfig = {
  region: 'us-east-1'
}
export const client = new DynamoDBClient(clientConfig)

/**
 * Calls DynamoDB ScanCommand to retrieve all items in table.
 * @param {*} tableName 
 * @returns Object of all items in table.
 */
export const getAllEmployeeInfo = async (tableName=TABLE) => {
  const request = {
    TableName: tableName
  }
  const command = new ScanCommand(request)
  try {
    let response = await client.send(command)

    if (response) {
      const items = response.Items.map(item => unmarshall(item))
      return items
    } else {
      return response ? response : null
    }
    
  } catch (err) {
    console.error(err);
  }
}

/**
 * Put single employee item into DynamoDB table.
 * @param {*} props JSON object containing employee data
 * @param {*} tableName name of DDB table to put item into
 */
export const putEmployee = async (props, tableName=TABLE) => {
  const employeePutData = {
    TableName: tableName,
    Item: {
      EmployeeID: {
        S: props.EmployeeID
      },
      FirstName: {
        S: props.FirstName
      },
      LastName: {
        S: props.LastName
      },
      StartDate: {
        S: props.StartDate
      },
      Country: {
        S: props.Country
      },
      DepartmentID: {
        S: props.DepartmentID
      },
      Title: {
        S: props.Title
      },
      ManagerID: {
        NULL: true,
        S: props.ManagerID
      },
      ManagerName: {
        NULL: true,
        S: props.ManagerName
      }
    }
  }

  const command = new PutItemCommand(employeePutData)

  try {
    await client.send(command)
  } catch (err) {
    console.error(import.meta.url, err)
  }
}

/**
 * Get single employee item from DynamoDB table.
 * @param {*} props 
 * @param {*} tableName 
 * @returns Object of single item. 
 */
export const getEmployeeByID = async (props, tableName=TABLE) => {
  const input = {
    Key: {
      EmployeeID: {
        S: props
      }
    },
    TableName: tableName
  }

  const command = new GetItemCommand(input)

  try {
    let response = await client.send(command)
    
    if (response.Item) {
      response = unmarshall(response.Item)
      return response
    } else {
      return null
    }
  } catch (err) {
    console.error(import.meta.url, err)
  }
}

/**
 * Create DynamoDB table.
 * @returns Create table response.
 */
export const createTable = async () => {
  const employeeTableInput = {
    AttributeDefinitions: [
      {
        AttributeName: 'EmployeeID',
        AttributeType: 'S'
      }
    ],
    TableName: 'Employees',
    KeySchema: [
      {
        AttributeName: 'EmployeeID',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }

  const command = new CreateTableCommand(employeeTableInput)
  try {
    const response = await client.send(command)
    console.log(response)
    return response
  } catch (err) {
    console.error(import.meta.url, err)
  }
}
