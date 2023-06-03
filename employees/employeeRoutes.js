import { Router } from 'express';
const router = Router();
import { getTableHandler, postItemHandler } from './employeeController.js';

router.get('/', getTableHandler);
router.post(/^\/(?:([^\/]+?))\/profile$/, postItemHandler)

export default router;