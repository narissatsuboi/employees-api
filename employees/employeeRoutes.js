import { Router } from 'express';
const router = Router();
import fileUpload from 'express-fileupload';
import { getTableHandler, postItemHandler, getItemHandler } from './employeeController.js';
import { getPhotoHandler, postPhotoHandler } from './employeeController.js';

router.get('/', getTableHandler);

router.get(/^\/(?:([^\/]+?))\/profile$/, getItemHandler)

router.post(/^\/(?:([^\/]+?))\/profile$/, postItemHandler)

router.get(/^\/(?:([^\/]+?))\/photo$/, getPhotoHandler)

router.post(/^\/(?:([^\/]+?))\/photo$/, postPhotoHandler, fileUpload())

export default router;