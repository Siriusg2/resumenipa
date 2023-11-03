
const datasModel = require('../models/datasModel');
const usersModel = require('../models/usersModel')

/*
*********************** PIE CHART ***********************

    pieChart2: {
        chartData: {
          labels: [1, 2, 3],
          datasets: [
            {
              label: 'Emails',
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ['#ff8779', '#2a84e9', '#e2e2e2'],
              borderWidth: 0,
              data: [60, 40, 20]
            }
          ]
        },
        extraOptions: chartConfigs.pieChartOptions
      }

*************************************************************



*******************BAR CHART *****************************

{
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              label: 'Data',
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [80, 100, 70, 80, 120, 80]
            }
          ]
        },
        extraOptions: chartConfigs.barChartOptionsGradient,
        gradientColors: config.colors.purpleGradient,
        gradientStops: [1, 0]
      }

****************************************************

*/

const alarmsCount = (allData) => {
    const filteredData = allData.filter(document => Object.keys(document.data).length ? document : undefined)

    return allData[0]
}

module.exports = alarmsCount 