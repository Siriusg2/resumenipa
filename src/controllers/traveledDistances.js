
const generateRandomHexColors = require('../utils/generateRandomHexColors')
const devicesModel = require('../models/devicesModel')
const distancesCalculator = require('../utils/distancesCalculator')
const { barChartOptionsGradient } = require('../utils/graphOptions')
/**
 * Calculates the traveled distances for each device based on the given data.
 *
 * @param {Array} allData - The array of data containing GPS coordinates for each device.
 * @return {Object} An object containing the chart data for the total distance and average distance per day.
 */
const traveledDistances = async (allData) => {
  const filteredAndOrderedData = allData
    .filter(data => Object.keys(data.data.gps).length)
    .sort((a, b) => a.time - b.time)
    .filter(data => data != undefined);

  const totalTrialDays = parseInt(
    (filteredAndOrderedData[filteredAndOrderedData.length - 1].time - filteredAndOrderedData[0].time) / (1000 * 60 * 60 * 24),
    10
  );

  const ids = Array.from(new Set(filteredAndOrderedData.map(data => data.dId)));

  const devicesNamesAndDIds = (
    await devicesModel.find({ dId: { $in: ids } })
  ).map(device => ({
    name: device.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    dId: device.dId,
    countKms: 0,
    averagePerDay: 0,
  }));


  const result = devicesNamesAndDIds.map(device => {
    const filteredPerDevice = filteredAndOrderedData.filter(data => data.dId === device.dId);

    for (let i = 0; i < filteredPerDevice.length - 1; i++) {
      const currentLat = filteredPerDevice[i].lat;
      const currentLong = filteredPerDevice[i].lng;
      const nextLat = filteredPerDevice[i + 1].lat;
      const nextLong = filteredPerDevice[i + 1].lng;

      device.countKms += distancesCalculator(currentLat, currentLong, nextLat, nextLong);
      device.averagePerDay += distancesCalculator(currentLat, currentLong, nextLat, nextLong) / totalTrialDays;
    }

    return device;
  });

  const totalDistanceChartData = {
    chartData: {
      labels: result.map(r => r.name),
      datasets: [
        {
          label: 'Distancia total recorrida',
          fill: true,
          borderColor: generateRandomHexColors(1)[0],
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: result.map(r => r.countKms.toFixed(2)),
        },
      ],
    },
    extraOptions: barChartOptionsGradient,
    gradientColors: generateRandomHexColors(2),
    gradientStops: [1, 0],
  };

  const averageDistancePerDayChartData = {
    chartData: {
      labels: result.map(r => r.name),
      datasets: [
        {
          label: 'Distancia promedio por dia',
          fill: true,
          borderColor: generateRandomHexColors(1)[0],
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: result.map(r => r.averagePerDay.toFixed(2)),
        },
      ],
    },
    extraOptions: barChartOptionsGradient,
    gradientColors: generateRandomHexColors(2),
    gradientStops: [1, 0],
  };

  console.log(JSON.stringify(totalDistanceChartData));
  return {
    totalDistanceChartData,
    averageDistancePerDayChartData,
  };
};

module.exports = traveledDistances