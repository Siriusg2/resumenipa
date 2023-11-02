const express = require('express')
const morgan = require('morgan')
const mongodb = require('mongodb')
const router = require('./route')
const { connect } = require('./connectDb')
const app = express()

app.listen(3000, () => {

    console.info('Listening on port 3000')

    try {
        connect()
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error(error);
    }

})


app.use(morgan('dev'))
app.use(express.json())
app.use('/', router)


