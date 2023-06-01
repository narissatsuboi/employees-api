import { scanTable } from './ddb_scantable.js'
import { putItem } from './ddb_putitem.js'

export const getAllTableItems = async ( tableName ) => {
    return await scanTable(tableName)
}

export const putTableItem = async ( ) => {
    return await putItem()
}