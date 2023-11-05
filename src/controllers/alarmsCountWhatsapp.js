const generarColoresAleatorios = require('../utils/generateRandomHexColors')
const { basicOptions, barChartOptionsGradient, pieChartOptions } = require('../utils/graphOptions')




const keyWords = [{ tag: "speedLimit", keyword: "superada", chartTag: "Limite de velocidad" }, { tag: "fall", keyword: "caida", chartTag: "Caida" }, { tag: "panicButton", keyword: "panico", chartTag: "Botón de panico" }, { tag: "powerOff", keyword: "apagado", chartTag: "Dispositivo apagado" }, { tag: "PowerOn", keyword: "encendido", chartTag: "Dispositivo encendido" }, { tag: "noMovement", keyword: "inactividad", chartTag: "Inactividad" }, { tag: "lowBattery", keyword: "baja", chartTag: "Bateria baja" }, { tag: "sosMode", keyword: "activado", chartTag: "Modo SOS" }, { tag: "geofenceOut", keyword: "saliendo", chartTag: "Salida geocerca" }]

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
    let valueToSplit = devicesNames.find(({ name }) =>
      name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === root
    ).contactsQuantity;

    //aqui añadimos las propiedades no encontradas para cada dispositivo
    //de esta forma los datos tienen consistencia para la configuracion de los graficos
    const properties = keyWords.map(({ tag }) => tag);


    for (const property of properties) {
      if (!perTypeCountStructure[root].hasOwnProperty(property)) {
        perTypeCountStructure[root][property] = 0;
      }
    }

    for (const alarm in perTypeCountStructure[root]) {
      if (alarm === "geofenceOut") {
        perTypeCountStructure[root][alarm] = Math.ceil(perTypeCountStructure[root][alarm] / (valueToSplit + 1));
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
      let values = Object.values(perTypeCountStructure[dispositivo]);
      let total = values.reduce((a, b) => a + b, 0);
      const alarmas = perTypeCountStructure[dispositivo];
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
          label: 'Alarmas por dispositivo',
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: generarColoresAleatorios(arrayDeObjetos.length),
          borderWidth: 0,
          data: arrayDeObjetos.map(({ total }) => total)
        }
      ]
    },
    extraOptions: pieChartOptions
  }
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

        let color = generarColoresAleatorios(arrayDeObjetos.length)[0]
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
  console.log(JSON.stringify(alarmsPerTypePerDeviceBarChartStrucucture));
  return {
    totalAlarms: totalAlarmsPerDevicePieChartStrucucture,
    alarmTypes: alarmsPerTypePerDeviceBarChartStrucucture
  }
};

module.exports = alarmsCountWhatsapp 