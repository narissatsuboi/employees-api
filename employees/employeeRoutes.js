import { Router } from 'express';
const router = Router();
import { getTableHandler } from './employeeController.js';

router.get('/', getTableHandler);
// router.get('/dev', EmployeeController.getDevRecordsHandler);
// router.get('/:permitnumber', EmployeeController.getRecordByPermitNumberHandler);

export default router;