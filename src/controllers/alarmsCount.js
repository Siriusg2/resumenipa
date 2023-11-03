// const { client } = require('../connectDb')
// const db = client.db('iotab')
// const whatsappCollection = db.collection('whatsapp')
// const usersCollection = db.collection('users')
// const devicesCollection = db.collection('devices')
// const datasCollection = db.collection('datas')
// const channelsCollection = db.collection('channels')
const datasModel = require('../models/datasModel')



const alarmsCount = async (channelId, startDate, endDate) => {
    const allDevices = await datasModel.find({})

    return allDevices
}

module.exports = alarmsCount 