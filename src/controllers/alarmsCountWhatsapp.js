


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
  const { devicesNames, whatsappMessages } = whatsAppData;
  let perTypeCountStructure = {};

  whatsappMessages.forEach(({ messages }) => {
    const devicesStringNames = devicesNames.map(({ name }) => name);

    messages.forEach(({ message }) => {
      if (message) {
        const alarm = keyWords.find(({ keyword }) =>
          message.toLowerCase().includes(keyword.toLowerCase())
        );
        const nameOfDevice = devicesStringNames.find((deviceName) =>
          message.toLowerCase().includes(deviceName.toLowerCase())
        );

        if (alarm && nameOfDevice) {
          const normalizedName = nameOfDevice.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const { tag: alarmTag } = alarm;

          if (!perTypeCountStructure[normalizedName]) {
            perTypeCountStructure[normalizedName] = {};
          }

          if (!perTypeCountStructure[normalizedName][alarmTag]) {
            perTypeCountStructure[normalizedName][alarmTag] = 0;
          }

          perTypeCountStructure[normalizedName][alarmTag]++;
        }
      }
    });
  });

  for (const root in perTypeCountStructure) {
    const valueToSplit = devicesNames.find(({ name }) =>
      name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === root
    ).contactsQuantity;

    for (const alarm in perTypeCountStructure[root]) {
      perTypeCountStructure[root][alarm] = Math.ceil(perTypeCountStructure[root][alarm] / valueToSplit);
    }
  }

  const totalPerDeviceCount = {};

  for (const dispositivo in perTypeCountStructure) {
    if (perTypeCountStructure.hasOwnProperty(dispositivo)) {
      const alarmas = perTypeCountStructure[dispositivo];
      let totalAlarmas = 0;

      for (const tipoAlarma in alarmas) {
        if (alarmas.hasOwnProperty(tipoAlarma)) {
          totalAlarmas += alarmas[tipoAlarma];
        }
      }

      totalPerDeviceCount[dispositivo] = totalAlarmas;
    }
  }
  console.log(totalPerDeviceCount);
  console.log(perTypeCountStructure);
  return {
    perTypeCountStructure, totalPerDeviceCount
  }
};

module.exports = alarmsCountWhatsapp 