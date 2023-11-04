


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
const keyWords = [{ tag: "speedLimit", keyword: "superada" }, { tag: "fall", keyword: "caida" }, { tag: "panicButton", keyword: "panico" }, { tag: "powerOff", keyword: "apagado" }, { tag: "PowerOn", keyword: "encendido" }, { tag: "noMovement", keyword: "inactividad" }, { tag: "lowBattery", keyword: "baja" }, { tag: "sosMode", keyword: "activado" }, { tag: "geofenceOut", keyword: "saliendo" }]

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
        let alarm = keyWords.find(alarm => element.message.toLowerCase().includes(alarm.keyword.toLowerCase()));
        let nameOfDevice = devicesStringNames.find(deviceName => element.message.toLowerCase().includes(deviceName.toLowerCase()));
        if (alarm && Object.keys(alarm).length && nameOfDevice) {
          alarm = alarm.tag
          nameOfDevice = nameOfDevice.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          if (countStructure[nameOfDevice]) {
            if (countStructure[nameOfDevice][alarm]) {
              countStructure[nameOfDevice][alarm] += 1
            } else {
              countStructure[nameOfDevice][alarm] = 1

            }
          } else {
            countStructure[nameOfDevice] = {
              [alarm]: 1,


            }
          }


        }

      }
    })
  })

  for (let root in countStructure) {
    for (let alarm in countStructure[root]) {
      const valueToSplit = devicesNames.find(device => device.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === root).contactsQuantity

      countStructure[root][alarm] = Math.ceil(countStructure[root][alarm] / valueToSplit)



    }
  }

  const totalcountStructure = {};

  // Recorre cada dispositivo en el objeto
  for (const dispositivo in countStructure) {
    if (countStructure.hasOwnProperty(dispositivo)) {
      const alarmas = countStructure[dispositivo];
      let totalAlarmas = 0;

      // Recorre cada tipo de alarma para el dispositivo
      for (const tipoAlarma in alarmas) {
        if (alarmas.hasOwnProperty(tipoAlarma)) {
          totalAlarmas += alarmas[tipoAlarma];
        }
      }

      totalcountStructure[dispositivo] = totalAlarmas;
    }
  }

}

module.exports = alarmsCountWhatsapp 