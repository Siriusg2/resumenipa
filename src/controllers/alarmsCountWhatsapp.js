const generateRandomHexColors = require('../utils/generateRandomHexColors')
const { basicOptions, barChartOptionsGradient, pieChartOptions } = require('../utils/graphOptions')




const keyWords = [{ tag: "speedLimit", keyword: "superada", chartTag: "Limite de velocidad" }, { tag: "fall", keyword: "caida", chartTag: "Caida" }, { tag: "panicButton", keyword: "panico", chartTag: "Botón de panico" }, { tag: "powerOff", keyword: "apagado", chartTag: "Dispositivo apagado" }, { tag: "PowerOn", keyword: "encendido", chartTag: "Dispositivo encendido" }, { tag: "noMovement", keyword: "inactividad", chartTag: "Inactividad" }, { tag: "lowBattery", keyword: "baja", chartTag: "Bateria baja" }, { tag: "sosMode", keyword: "activado", chartTag: "Modo SOS" }, { tag: "geofenceOut", keyword: "saliendo", chartTag: "Salida geocerca" }]

/**
 * Calculates the number of alarms for each device and generates charts for the total number of alarms and the types of alarms per device.
 *
 * @param {Object} whatsAppData - An object containing device names and WhatsApp messages.
 * @param {Array} whatsAppData.devicesNames - An array of objects containing device names.
 * @param {Array} whatsAppData.whatsappMessages - An array of objects containing WhatsApp messages.
 * @param {string} whatsAppData.devicesNames[].name - The name of a device.
 * @param {Array} whatsAppData.whatsappMessages[].messages - An array of objects containing WhatsApp messages.
 * @param {string} whatsAppData.whatsappMessages[].messages[].message - The content of a WhatsApp message.
 * @return {Object} An object containing two chart structures: one for the total number of alarms per device and one for the types of alarms per device.
 */
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

    const properties = keyWords.map(({ tag }) => tag);

    for (const property of properties) {
      if (!perTypeCountStructure[root].hasOwnProperty(property)) {
        perTypeCountStructure[root][property] = 0;
      }
    }

    for (const alarm in perTypeCountStructure[root]) {
      if (alarm === "geofenceOut") {
        perTypeCountStructure[root][alarm] = Math.ceil(perTypeCountStructure[root][alarm] / (valueToSplit + 3));
      } else {
        perTypeCountStructure[root][alarm] = Math.ceil(perTypeCountStructure[root][alarm] / valueToSplit);
      }
    }
  }


  ///////////////////////////////////////////////////////////////////

  /*
  
  
  
 
 
CONVERTIMOS LA ESTRUCTURA DE OBJETOS ANINADOS A UN ARRAY DE OBJETOS Y TOTALIZAMOS LAS ALARMAS
 
*/
  const arrayDeObjetos = [];

  for (const dispositivo in perTypeCountStructure) {
    if (perTypeCountStructure.hasOwnProperty(dispositivo)) {
      const alarmas = perTypeCountStructure[dispositivo];
      const total = Object.values(alarmas).reduce((a, b) => a + b, 0);
      const objeto = { deviceName: dispositivo, ...alarmas, total };
      arrayDeObjetos.push(objeto);
    }
  }

  /**************************************************************************************** */



  //! IMPORTANTE, ESTA ES LA ESTRUCTURA QUE DEBE TENER LA DATA PARA EL GRAFICO DE TORTA DE TOTAL DE ALARMAS POR DISPOSITIVO* 
  let totalAlarmsPerDevicePieChartStrucucture = {
    chartData: {
      labels: arrayDeObjetos.map(({ deviceName }) => deviceName),
      datasets: [
        {
          label: 'Distancia total recorrida',
          fill: true,
          borderColor: generateRandomHexColors(1)[0],
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: arrayDeObjetos.map(({ total }) => total),
        },
      ],
    },
    extraOptions: barChartOptionsGradient,
    gradientColors: generateRandomHexColors(2),
    gradientStops: [1, 0],
  };
  // console.log(JSON.stringify(totalAlarmsPerDevicePieChartStrucucture));


  //****************************************************************!/

  //! IMPORTANTE, ESTA ES LA ESTRUCTURA QUE DEBE TENER LA DATA PARA EL GRAFICO DE BARRAS DE TIPOS DE ALARMAS POR DISPOSITIVO* 

  let dataToStructure = arrayDeObjetos.map(device => {

    let result = {
      deviceName: device.deviceName,
      count: [
        { tag: "Dispositivo apagado", value: device.powerOff },
        { tag: "Dispositivo encencido", value: device.powerOn },
        { tag: "Salida geocerca", value: device.geofenceOut },
        { tag: "Boton de panico", value: device.panicButton },
        { tag: "Caida", value: device.fall },
        { tag: "Limite de velocidad", value: device.speedLimit },
        { tag: "Inactvidad", value: device.noMovement },
        { tag: "Bateria Baja", value: device.lowBattery },
        { tag: "Modo SOS", value: device.sosMode }
      ]

    }
    return result
  })



  let alarmsPerTypePerDeviceBarChartStrucucture = {

    chartData: {
      labels: dataToStructure[0].count.map(({ tag }) => tag),
      datasets: dataToStructure.map((device) => {

        let color = generateRandomHexColors(arrayDeObjetos.length)[0]
        return {
          label: device.deviceName,
          fill: true,
          backgroundColor: color,
          hoverBackgroundColor: color,
          borderColor: color,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: device.count.map(({ value }) => value)
        }
      }),


    },
    extraOptions: barChartOptionsGradient

  }


  //****************************************************************!/
  // console.log(JSON.stringify(alarmsPerTypePerDeviceBarChartStrucucture));
  return {
    totalAlarms: totalAlarmsPerDevicePieChartStrucucture,
    alarmTypes: alarmsPerTypePerDeviceBarChartStrucucture
  }
};

module.exports = alarmsCountWhatsapp 