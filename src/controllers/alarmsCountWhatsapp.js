


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
const keyWords = ["superada", "caída", "panico", "apagado", "encendido", "inactividad", "baja", "activado", "saliendo"]

const alarmsCountWhatsapp = (whatsAppData) => {
  const {
    devicesNames,
    whatsappMessages
  } = whatsAppData
  let countStructure = {}


  whatsappMessages.forEach(contact => {
    let devicesStringNames = devicesNames.map(device => device.name)
    contact.messages.forEach(element => {
      if (element.message) {
        let alarm = keyWords.find(alarm => element.message.toLowerCase().includes(alarm.toLowerCase()));
        let nameOfDevice = devicesStringNames.find(deviceName => element.message.toLowerCase().includes(deviceName.toLowerCase()));
        if (alarm && nameOfDevice) {
          alarm = alarm.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          nameOfDevice = nameOfDevice.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          if (countStructure[nameOfDevice]) {
            if (countStructure[nameOfDevice][alarm]) {
              countStructure[nameOfDevice][alarm] += 1
            } else {
              countStructure[nameOfDevice][alarm] = 1
            }
          } else {
            countStructure[nameOfDevice] = {
              [alarm]: 1 //alarm
            }
          }

        }

      }
    })
  })

  for (let root in countStructure) {
    for (let alarm in countStructure[root]) {
      const valueToSplit = devicesNames.find(device => device.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === root).contactsQuantity

      countStructure[root][alarm] = Math.round(countStructure[root][alarm] / valueToSplit)

    }
  }
  console.log(countStructure);

}

module.exports = alarmsCountWhatsapp 