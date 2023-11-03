const express = require('express')
const morgan = require('morgan')
const mongodb = require('mongodb')
const router = require('./route')
const { connectDb } = require('./connectDb')
const app = express()

app.listen(3000, () => {
    console.info('Listening on port 3000')
    connectDb()

})


app.use(morgan('dev'))
app.use(express.json())
app.use('/', router)


