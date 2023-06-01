import { getAllTableItems } from "./employeeService.js";

export const getTableHandler = async (req, res) => {
  const tableData = await getAllTableItems();
  if (tableData) {
    res.type('json').send(JSON.stringify(tableData.Items, null, '\t'))
  } else {
    res.json({ message : 'you reached /employees endpoint'});
  }
};

// const getRecordByPermitNumberHandler = async (req, res) => {
//   const permitNumber = req.params.permitnumber;
//   const record = await RecordsService.findRecordByPermitNumber(permitNumber);
//   if (record) {
//     res.json(record) ;
//   }
// };

// const getDevRecordsHandler = async (req, res) => {
//   const records = await RecordsService.findDevRecords();
//   if (records) {
//     res.json({ data : records }); 
//   }
// };