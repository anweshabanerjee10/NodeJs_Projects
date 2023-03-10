require('dotenv').config()

// async errors

const express = require('express')
require('express-async-errors')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const notFoundMiddleware = require('../starter/middleware/not-found')
const errorMiddleware = require('../starter/middleware/error-handler')

//middleware
app.use(express.json())

//routes

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)
//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.port || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is running on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
