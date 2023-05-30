const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/employees', require('./routes/employeeRoutes'))

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
