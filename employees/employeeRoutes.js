import { Router } from 'express';
const router = Router();
import { getTableHandler, putItemHandler } from './employeeController.js';

router.get('/', getTableHandler);
router.post(/^\/(?:([^\/]+?))\/profile$/, putItemHandler)

export default router;