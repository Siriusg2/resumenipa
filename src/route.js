const router = require('express').Router()
const alarmsCount = require('./controllers/alarmsCount')
const alarmsCountWhatsapp = require('./controllers/alarmsCountWhatsapp')
const getAllData = require('./controllers/getAllData')
const getAllDataWhatsapp = require('./controllers/getAllDataWhatsapp')


router.get('/charts-report', async (req, res) => {
    const { channelId, startDate, endDate } = req.query
    const allData = await getAllData(channelId, startDate, endDate)
    const allDataWhatsapp = (await getAllDataWhatsapp(channelId, startDate, endDate))
    const filteredData = alarmsCountWhatsapp(allDataWhatsapp)
    return res.status(200).send(allDataWhatsapp)
})

module.exports = router