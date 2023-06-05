import { Router } from 'express'
const router = Router()
import multer from 'multer'
import {
  getTableHandler,
  postItemHandler,
  getItemHandler
} from './employeeController.js'
import { getPhotoHandler, postPhotoHandler } from './employeeController.js'

router.get('/', getTableHandler)

router.get(/^\/(?:([^\/]+?))\/profile$/, getItemHandler)

router.post(/^\/(?:([^\/]+?))\/profile$/, postItemHandler)

router.get(/^\/(?:([^\/]+?))\/photo$/, getPhotoHandler)

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post(/^\/(?:([^\/]+?))\/photo$/, upload.single('file'), postPhotoHandler)

export default router
