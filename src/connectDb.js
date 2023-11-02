const { MongoClient } = require('mongodb');

// URL de conexión a tu base de datos MongoDB
const url = 'mongodb://admin:iotabserver@app.blipconnection.com:27017/'; // 
// Nombre de la base de datos
const dbName = 'iotab'; // Cambia por el nombre de tu base de datos

// Crea una instancia del cliente
const client = new MongoClient(url, { useUnifiedTopology: true });

// Conéctate a la base de datos
async function connect() {
    try {
        await client.connect();
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
}

// Llama a la función para conectarte a la base de datos
module.exports = { connect, client }