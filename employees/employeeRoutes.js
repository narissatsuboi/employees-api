import { Router } from 'express'
const router = Router()
import multer from 'multer'
import {
  getAllEmployees,
  postEmployeeHandler,
  getEmployeeByIDHandler,
  getUnmarshalledData,
} from './employeeController.js'
import { getPhotoHandler, postPhotoHandler } from './employeeController.js'

router.get('/', getAllEmployees)
router.get('/all/', getUnmarshalledData)


router.get(/^\/(?:([^\/]+?))\/profile$/, getEmployeeByIDHandler)

router.post(/^\/(?:([^\/]+?))\/profile$/, postEmployeeHandler)

router.get(/^\/(?:([^\/]+?))\/photo$/, getPhotoHandler)

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post(/^\/(?:([^\/]+?))\/photo$/, upload.single('file'), postPhotoHandler)

export default router
