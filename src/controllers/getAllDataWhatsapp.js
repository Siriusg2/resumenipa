
const usersModel = require('../models/usersModel');
const whatsappModel = require('../models/whatsappModel')
const devicesModel = require('../models/devicesModel')

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

const keyWords = ["velocidad", "caída", "panico", "apagado", "encendido", "inactividad", "baja", "activado el modo SOS"]

const getAllDataWhatsapp = async (channelId, startDate, endDate) => {
  const usersIds = (await usersModel.find({ channel: channelId })).map(user => user._id)
  let devicesContacts = (await devicesModel.find({ userId: { $in: usersIds } })).map(device => {
    let contactsParsed = JSON.parse(device.contacts).map(contact => {

      return contact.number



    })
    return contactsParsed[0]
  })

  const whatsappMessages = await whatsappModel.find({ number: { $in: devicesContacts } })

  return whatsappMessages


}

module.exports = getAllDataWhatsapp 