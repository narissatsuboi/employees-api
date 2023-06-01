import express, { json, urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import employeeRoutes from './employees/employeeRoutes.js'

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/employees', employeeRoutes)

const startServer = (port = 5000) => {
  app.listen(port, () => console.log(`Server is running on port: ${port}`))
}

const run = async port => {
  try {
    startServer(port)
  } catch (err) {
    console.log(err)
  }
}

run(5000)
