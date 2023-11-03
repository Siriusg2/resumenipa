const datasModel = require('../models/datasModel')
const usersModel = require('../models/usersModel')
const stringDateToUnixParser = require('../utils/stringDateToUnixParser')



const getAllData = async (channelId, startDate, endDate) => {
    startDate = stringDateToUnixParser(startDate)
    endDate = stringDateToUnixParser(endDate)
    const usersIds = (await usersModel.find({ channel: channelId })).map(user => user._id)
    let datas = (await datasModel.find({ userId: { $in: usersIds }, time: { $gte: startDate, $lte: endDate } })).map(data => {

        return {
            _id: data._id,
            value: data.value,
            data: JSON.parse(data.data),
            userId: data.userId,
            dId: data.dId,
            variable: data.variable,
            time: data.time,
            lat: data.lat,
            lng: data.lng,

        };
    })


    return datas
}

module.exports = getAllData