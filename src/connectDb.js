
const mongoose = require('mongoose');
// URL de conexión a tu base de datos MongoDB
const url = 'mongodb://admin:iotabserver@app.blipconnection.com:27017/'
// Nombre de la base de datos




// Conéctate a la base de datos
async function connectDb() {

    try {

        mongoose.connect(url, { dbName: 'iotab' });

        mongoose.connection.on('connected', () => {
            console.log('Conexión a la base de datos establecida');
        });

    } catch (error) {
        console.error(error);
    }
}

// Llama a la función para conectarte a la base de datos
module.exports = { connectDb }