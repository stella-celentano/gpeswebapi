const express = require("express")
const app = express()

const AuthenticationRoutes = require('./routes/authentication.public')
const ContatoRoutes = require('./routes/contato.public')

app.use('/authentication', AuthenticationRoutes)
app.use('/contato', ContatoRoutes)

module.exports = app