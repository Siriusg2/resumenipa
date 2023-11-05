const router = require('express').Router()
const alarmsCount = require('./controllers/alarmsCount')
const alarmsCountWhatsapp = require('./controllers/alarmsCountWhatsapp')
const getAllData = require('./controllers/getAllData')
const getAllDataWhatsapp = require('./controllers/getAllDataWhatsapp')
const traveledDistances = require('./controllers/traveledDistances')


router.get('/charts-report', async (req, res) => {
    let { channelId, startDate, endDate } = req.query


    startDate ? startDate = startDate : startDate = '01/01/2019'
    endDate ? endDate = endDate : endDate = String(new Date().getDate()).padStart(2, '0').concat('/').concat(String(new Date().getMonth() + 1).padStart(2, '0')).concat('/').concat(new Date().getFullYear());



    const allDataWhatsapp = (await getAllDataWhatsapp(channelId, startDate, endDate))
    const allData = await getAllData(channelId, startDate, endDate)


    let result = {
        // alarms: alarmsCountWhatsapp(allDataWhatsapp),
        distances: await traveledDistances(allData),
    }

    return res.status(200).send(result)
})

module.exports = router