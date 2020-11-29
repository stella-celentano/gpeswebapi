require('dotenv').config()
const mongoose = require('mongoose')
const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASS
} = process.env
const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
}

let db = null
const URI_DATABASE = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

db = mongoose.connect(URI_DATABASE, options)
    .then(() => console.log('Banco de dados conectado com sucesso!'))
    .catch(error => {
        console.log(`Problema ao conectar com o banco de dados: ${error.message}`);
    });

module.exports = { db }