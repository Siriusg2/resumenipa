const router = require('express').Router()
const { client } = require('./connectDb')

const db = client.db('iotab')
const whatsappCollection = db.collection('whatsapp')
const usersCollection = db.collection('users')
const devicesCollection = db.collection('devices')
const datasCollection = db.collection('datas')
const channelsCollection = db.collection('channels')

router.get('/holis', async (req, res) => {
    const devices = await devicesCollection.find({}).toArray()

    return res.send(devices)
})

module.exports = router