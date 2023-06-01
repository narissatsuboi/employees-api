import { scanTable } from './ddb_scantable.js'

export const getAllTableItems = async ( tableName ) => {
    return await scanTable(tableName)
}
