import { client } from './profileService.js'

import { ExecuteStatementCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const docClient = DynamoDBDocumentClient.from(client)

const main = async () => {
    const command = new ExecuteStatementCommand({
        Statement: "SELECT * FROM Employees WHERE EmployeeID = 1234567",
        Parameters: [false],
        ConsistentRead: true,
    })

    const response = await docClient.send(command)  
    console.log(response)
    return response
}

main() 