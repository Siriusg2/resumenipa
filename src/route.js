const router = require('express').Router()
const alarmsCount = require('./controllers/alarmsCount')
const getAllData = require('./controllers/getAllData')



router.get('/charts-report', async (req, res) => {
    const { channelId, startDate, endDate } = req.query
    const allData = await getAllData(channelId, startDate, endDate)
    const filteredData = alarmsCount(allData)
    return res.status(200).send(filteredData)
})

module.exports = router