const express = require('express')

const app = express()

const tasks = require('./routes/tasks')

const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('../starter/middleware/not-found')
const errorHandlerMiddleware = require('../starter/middleware/error-handler')
//middleware

//otherwise we won't have this data in req.body
app.use(express.static('./public'))
app.use(express.json())

//routes

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
