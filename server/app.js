require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { errorHandler } = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const eventsRouter = require('./controllers/events')

mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)

app.use(cors())
app.use(bodyParser.json())

let MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(express.static(path.resolve(__dirname, '../ui/build')))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/events', eventsRouter)

app.use(errorHandler)

module.exports = app