import { getAllItems, putItem, getItem } from "./employeeService.js";

/**
 * GET handler for /servicename.
 * @param {*} req 
 * @param {*} res 
 */
export const getTableHandler = async (req, res) => {
  const tableData = await getAllItems();
  if (tableData) {
    res.type('json').send(JSON.stringify(tableData.Items, null, '\t'))
  } else {
    res.json({ message : 'No items to show'});
  }
};


/**
 * GET handler for /employee/:id/profile.
 * @param {*} req 
 * @param {*} res 
 */
export const getItemHandler = async (req, res) => {
  const paramID = req.params[0];
  const response = await getItem(paramID);
  console.log(Object.keys(response).length)
  if (Object.keys(response).length === 1) {
    res.status(200).json({ message : 'No item matching provided URL parameter ' + paramID + ' found.'});
  } else {
    res.type('json').send(response.Item, null, '\t')
  }
}


/**
 * POST handler for /employee/:id/profile. 
 * @param {*} req 
 * @param {*} res 
 */
export const postItemHandler = async (req, res) => {
  const paramID = req.params[0];

  if ( paramID !== req.body.EmployeeID ) {
    res.status(400).json({ message : 'EmployeeID in path and body do not match' });
  } else {
    await putItem(req.body, paramID);
    res.status(201).json({ message : 'POST for EmployeeID ' + paramID + ' successful.'})
  }
}