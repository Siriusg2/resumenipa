
const generateRandomHexColors = require('../utils/generateRandomHexColors')
const devicesModel = require('../models/devicesModel')
const { barChartOptionsGradient } = require('../utils/graphOptions')

const speedAverage = async (allData) => {
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
        speedAccumulator: 0,
        dataAccumulator: 0,
    }));


    const result = devicesNamesAndDIds.map(device => {
        const filteredPerDevice = filteredAndOrderedData.filter(data => data.dId === device.dId);

        for (let i = 0; i < filteredPerDevice.length; i++) {
            const { speed } = filteredPerDevice[i].data.gps;


            device.speedAccumulator += speed
            device.dataAccumulator++;
        }

        return device;
    });

    const speedAverageChartData = {
        chartData: {
            labels: result.map(r => r.name),
            datasets: [
                {
                    label: 'Velocidad promedio de paseo (km/h)',
                    fill: true,
                    borderColor: generateRandomHexColors(1)[0],
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: result.map(r => (r.speedAccumulator / r.dataAccumulator).toFixed(2)),
                },
            ],
        },
        extraOptions: barChartOptionsGradient,
        gradientColors: generateRandomHexColors(2),
        gradientStops: [1, 0],
    };
    // console.log(JSON.stringify(speedAverageChartData));

    return speedAverageChartData
}

module.exports = speedAverage