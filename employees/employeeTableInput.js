export const employeeTableInput = {
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