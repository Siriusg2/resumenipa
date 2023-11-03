const router = require('express').Router()
const alarmsCount = require('./controllers/alarmsCount')


router.get('/charts-report', async (req, res) => {
    const { channelId, startDate, endDate } = req.query
    const test = await alarmsCount(channelId, startDate, endDate)
    res.send(test)
})

module.exports = router