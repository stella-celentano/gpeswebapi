const express = require("express")
const app = express()

const ContatoRoutes = require('./routes/contato.public')


app.use('/contato', ContatoRoutes)

module.exports = app