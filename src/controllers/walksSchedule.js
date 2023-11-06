

const devicesModel = require('../models/devicesModel');
const generateRandomHexColors = require('../utils/generateRandomHexColors');
const { barChartOptionsGradient } = require('../utils/graphOptions');



const timeFrames = [
    { min: 0, max: 3, tag: "de 00:00 a 03:00", count: 0 },
    { min: 3, max: 6, tag: "de 03:00 a 06:00", count: 0 },
    { min: 6, max: 9, tag: "de 06:00 a 09:00", count: 0 },
    { min: 9, max: 12, tag: "de 09:00 a 12:00", count: 0 },
    { min: 12, max: 15, tag: "de 12:00 a 15:00", count: 0 },
    { min: 15, max: 18, tag: "de 15:00 a 18:00", count: 0 },
    { min: 18, max: 21, tag: "de 18:00 a 21:00", count: 0 },
    { min: 21, max: 24, tag: "de 21:00 a 00:00", count: 0 },


]

const walksSchedule = async (allData) => {
    const filteredAndOrderedData = allData
        .filter(data => Object.keys(data.data.gps).length)
        .sort((a, b) => a.time - b.time)
        .filter(data => data != undefined);


    const ids = Array.from(new Set(filteredAndOrderedData.map(data => data.dId)));

    const devicesNamesAndDIds = (
        await devicesModel.find({ dId: { $in: ids } })
    ).map(device => ({
        name: device.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        dId: device.dId,
        timeFrames: [
            { min: 0, max: 3, tag: "de 00:00 a 03:00", count: 0 },
            { min: 3, max: 6, tag: "de 03:00 a 06:00", count: 0 },
            { min: 6, max: 9, tag: "de 06:00 a 09:00", count: 0 },
            { min: 9, max: 12, tag: "de 09:00 a 12:00", count: 0 },
            { min: 12, max: 15, tag: "de 12:00 a 15:00", count: 0 },
            { min: 15, max: 18, tag: "de 15:00 a 18:00", count: 0 },
            { min: 18, max: 21, tag: "de 18:00 a 21:00", count: 0 },
            { min: 21, max: 24, tag: "de 21:00 a 00:00", count: 0 },


        ]
    }));


    const countResult = devicesNamesAndDIds.map(device => {
        const filteredPerDevice = filteredAndOrderedData.filter(data => data.dId === device.dId);

        for (let i = 0; i < filteredPerDevice.length; i++) {

            const timestampHourInNumber = new Date(parseInt(filteredPerDevice[i].time)).getHours() + 3;
            for (let j = 0; j < device.timeFrames.length; j++) {
                const element = device.timeFrames[j];
                if (element.min <= timestampHourInNumber && element.max >= timestampHourInNumber) {
                    element.count++
                }

            }

        }
        device.timeFrames = device.timeFrames.sort((a, b) => b.count - a.count)[0]
        return device;
    });

    for (let i = 0; i < countResult.length; i++) {
        const deviceTag = countResult[i].timeFrames.tag;

        const timeFrame = timeFrames.find(t => t.tag === deviceTag);
        timeFrame.count++

    }

    const walksScheduleChartData = {
        chartData: {
            labels: timeFrames.map(t => t.tag),
            datasets: [
                {
                    label: 'Mascotas paseadas frecuentemente en este horario',
                    fill: true,
                    borderColor: generateRandomHexColors(1)[0],
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: timeFrames.map(t => t.count),
                },
            ],
        },
        extraOptions: barChartOptionsGradient,
        gradientColors: generateRandomHexColors(2),
        gradientStops: [1, 0],
    };


    return walksScheduleChartData


}
module.exports = walksSchedule