import { getAllTableItems, putTableItem } from "./employeeService.js";

/**
 * GET handler for /employees.
 * @param {*} req 
 * @param {*} res 
 */
export const getTableHandler = async (req, res) => {
  const tableData = await getAllTableItems();
  if (tableData) {
    res.type('json').send(JSON.stringify(tableData.Items, null, '\t'))
  } else {
    res.json({ message : 'No Peoplesuite employees to list.'});
  }
};

/**
 * POST handler for /employees/:id/profile. 
 * @param {*} req 
 * @param {*} res 
 */
export const postItemHandler = async (req, res) => {
  const paramID = req.params[0];

  if ( paramID !== req.body.EmployeeID ) {
    res.status(400).json({ message : 'EmployeeID in path and body do not match' });
  } else {
    await putTableItem(req.body, paramID);
    res.status(201).json({ message : 'POST for EmployeeID ' + paramID + ' successful.'})
  }
}