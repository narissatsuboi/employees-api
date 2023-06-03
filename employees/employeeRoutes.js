import { Router } from 'express';
const router = Router();
import { getTableHandler, postItemHandler, getItemHandler } from './employeeController.js';

router.get('/', getTableHandler);
router.get(/^\/(?:([^\/]+?))\/profile$/, getItemHandler)
router.post(/^\/(?:([^\/]+?))\/profile$/, postItemHandler)

export default router;