const generarColoresAleatorios = require('../utils/generateRandomHexColors')
const keyWords = [{ tag: "speedLimit", keyword: "superada" }, { tag: "fall", keyword: "caida" }, { tag: "panicButton", keyword: "panico" }, { tag: "powerOff", keyword: "apagado" }, { tag: "PowerOn", keyword: "encendido" }, { tag: "noMovement", keyword: "inactividad" }, { tag: "lowBattery", keyword: "baja" }, { tag: "sosMode", keyword: "activado" }, { tag: "geofenceOut", keyword: "saliendo" }]

const alarmsCountWhatsapp = (whatsAppData) => {
  /* ITERAMOS EN LA DATA DE LA BASE DATOS PARA ENCONTRAR LAS ALARMAS */



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
  /*************************************************************************************/




  //SE PROMEDIA LA CANTIDAD DE MENSAJES ENTRE LOS NUMEROS DE CONTACTO PARA OBTENER EL VALOR REAL DE
  //LAS ALARMAS
  for (const root in perTypeCountStructure) {
    const valueToSplit = devicesNames.find(({ name }) =>
      name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === root
    ).contactsQuantity;

    for (const alarm in perTypeCountStructure[root]) {
      perTypeCountStructure[root][alarm] = Math.ceil(perTypeCountStructure[root][alarm] / valueToSplit);
    }
  }
  ///////////////////////////////////////////////////////////////////

  /*
  
  
  
  
  
  CONVERTIMOS LA ESTRUCTURA DE OBJETOS ANINADOS A UN ARRAY DE OBJETOS Y TOTALIZAMOS LAS ALARMAS
  
  */
  const arrayDeObjetos = [];

  for (const dispositivo in perTypeCountStructure) {
    if (perTypeCountStructure.hasOwnProperty(dispositivo)) {
      let values = Object.values(perTypeCountStructure[dispositivo]);
      let total = values.reduce((a, b) => a + b, 0);
      const alarmas = perTypeCountStructure[dispositivo];
      const objeto = { deviceName: dispositivo, ...alarmas, total };
      arrayDeObjetos.push(objeto);
    }
  }

  /**************************************************************************************** */



  //! IMPORTANTE, ESTA ES LA ESTRUCTURA QUE DEBE TENER LA DATA PARA EL GRAFICO DE TORTA DE TOTAL DE ALARMAS POR DISPOSITIVO* LAS PARTES COMENTADAS SON PARA QUE NO ROMPA EL CODIGO ACA, PQ SON CONFIFURACIONES DE LOS GRAFICOS QUE ESTAN EN EL FRONT//
  let totalAlarmsPerDevicePieChartStrucucture = {
    chartData: {
      labels: arrayDeObjetos.map(({ deviceName }) => deviceName),
      datasets: [
        {
          label: 'Alarmas por dispositivo',
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: generarColoresAleatorios(arrayDeObjetos.length),
          borderWidth: 0,
          data: arrayDeObjetos.map(({ total }) => total)
        }
      ]
    },
    // extraOptions: chartConfigs.pieChartOptions
  }
  // console.log(JSON.stringify(totalAlarmsPerDevicePieChartStrucucture));


  //****************************************************************!/

  //! IMPORTANTE, ESTA ES LA ESTRUCTURA QUE DEBE TENER LA DATA PARA EL GRAFICO DE BARRAS DE TIPOS DE ALARMAS POR DISPOSITIVO* LAS PARTES COMENTADAS SON PARA QUE NO ROMPA EL CODIGO ACA, PQ SON CONFIFURACIONES DE LOS GRAFICOS QUE ESTAN EN EL FRONT/
  let alarmsName = []
  arrayDeObjetos.map((device) => {

    for (const alarm in device) {
      if (alarm !== "deviceName" && alarm !== "total" && !alarmsName.includes(alarm)) {

        alarmsName.push(alarm)
      }
    }

  })
  let alarmsPerTypePerDeviceBarChartStrucucture = {

    chartData: {
      labels: alarmsName,
      datasets: arrayDeObjetos.map((device) => {
        let filteredData = []
        for (const alarm in device) {
          if (alarm !== "deviceName" && alarm !== "total") {

            filteredData.push({ alarm, value: device[alarm] })
          }

        }
        let color = generarColoresAleatorios(1)
        return {
          label: device.deviceName,
          fill: true,
          backgroundColor: color[0],
          hoverBackgroundColor: color[0],
          borderColor: color[0],
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: filteredData.map(({ value }) => value)
        }
      }),


    },
    // extraOptions: chartConfigs.barChartOptionsGradient

  }


  //****************************************************************!/
  return {
    totalAlarms: totalAlarmsPerDevicePieChartStrucucture,
    alarmTypes: alarmsPerTypePerDeviceBarChartStrucucture
  }
};

module.exports = alarmsCountWhatsapp 