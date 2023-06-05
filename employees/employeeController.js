import sharp from 'sharp'
import { getAllItems, putItem, getItem } from './profileService.js'
import { uploadImageObject } from './photoService.js'

/**
 * GET handler for /employees. Displays all employees.
 * @param {*} req
 * @param {*} res
 */
export const getTableHandler = async (req, res) => {
  const tableData = await getAllItems()
  if (tableData) {
    res.type('json').send(JSON.stringify(tableData.Items, null, '\t'))
  } else {
    res.json({ message: 'No items to show' })
  }
}

/**
 * GET handler for /employee/:id/profile.
 * @param {*} req
 * @param {*} res
 */
export const getItemHandler = async (req, res) => {
  const paramID = req.params[0]
  const response = await getItem(paramID)
  console.log(Object.keys(response).length)
  if (Object.keys(response).length === 1) {
    res.status(200).json({
      message: 'No item matching provided URL parameter ' + paramID + ' found.'
    })
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
  const paramID = req.params[0]

  if (paramID !== req.body.EmployeeID) {
    res
      .status(400)
      .json({ message: 'EmployeeID in path and body do not match' })
  } else {
    await putItem(req.body, paramID)
    res
      .status(201)
      .json({ message: 'POST for EmployeeID ' + paramID + ' successful.' })
  }
}

/**
 * GET handler for /employee/:id/photo.
 * @param {*} req
 * @param {*} res
 */
export const getPhotoHandler = async (req, res) => {
  res.status(200).json({ message: 'GET for photo successful.' })
}

/**
 * POST handler for /employee/:id/photo.
 * @param {*} req form data with file. Key must be 'file'.
 * @param {*} res
 */
export const postPhotoHandler = async (req, res) => {
  if (!req.file || Object.keys(req.file).length === 0) {
    return res
      .status(400)
      .send('No files were uploaded. Make sure form data key is "file".')
  }
  const paramID = req.params[0]
  const fileBuffer = await sharp(req.file.buffer).toBuffer()

  try {
    await uploadImageObject(paramID, fileBuffer)
  } catch (err) {
    return res.status(500).json({ message: 'ERROR Posting Photo.' })
  }
  res.status(201).json({ message: 'POST for photo successful.' })
}
