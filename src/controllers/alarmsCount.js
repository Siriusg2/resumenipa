// const { client } = require('../connectDb')
// const db = client.db('iotab')
// const whatsappCollection = db.collection('whatsapp')
// const usersCollection = db.collection('users')
// const devicesCollection = db.collection('devices')
// const datasCollection = db.collection('datas')
// const channelsCollection = db.collection('channels')
const whatsappModel = require('../models/whatsappModel')



const alarmsCount = async (channelId, startDate, endDate) => {
    const allDevices = await whatsappModel.findOne({ _id: '6515d7a60b72141bbd0febac' })

    return allDevices
}

module.exports = alarmsCount 