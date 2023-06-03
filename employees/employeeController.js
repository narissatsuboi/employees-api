import { getAllTableItems, putTableItem } from "./employeeService.js";

export const getTableHandler = async (req, res) => {
  const tableData = await getAllTableItems();
  if (tableData) {
    res.type('json').send(JSON.stringify(tableData.Items, null, '\t'))
  } else {
    res.json({ message : 'you reached /employees endpoint'});
  }
};

export const putItemHandler = async (req, res) => {
  const id = req.params[0];
  await putTableItem(req.body, id);
  res.status(201).json(req.body)
}