import dotenv from 'dotenv'
dotenv.config()
import express, { raw, json, urlencoded } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import employeeRoutes from './employees/employeeRoutes.js'

import {createTable} from './employees/profileService.js'
import {createBucket} from './employees/photoService.js'

const app = express({ extended: true })

app.use(bodyParser.json())
app.use(cors())
app.use(raw({ extended: true }))
app.use(json({ extended: true }))
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/peoplesuite/apis/employees', employeeRoutes)

const startServer = (port = 5000) => {
  app.listen(port, () => console.log(`Server is running on port: ${port}`))
}

const run = async port => {
  try {
    startServer(port)
    // await createTable()
    // await createBucket() 
  } catch (err) {
    console.log(err)
  }
}

run(5000)
