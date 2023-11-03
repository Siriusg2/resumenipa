const stringDateToUnixParser = (date) => {



    date = date.split('/');
    if (date.length === 3) {
        const day = parseInt(date[0], 10);
        const month = parseInt(date[1], 10);
        const year = parseInt(date[2], 10);

        // Crea un objeto Date utilizando las partes de la fecha
        const dateObject = new Date(year, month - 1, day);

        // Convierte la fecha a un timestamp UNIX en segundos
        const timestampUnixSegundos = parseFloat(Math.floor(dateObject.getTime())).toFixed(0);

        return timestampUnixSegundos
    } else {
        console.error("Formato de fecha no válido. Debe ser 'dd/mm/yyyy'.");
    }



}



module.exports = stringDateToUnixParser