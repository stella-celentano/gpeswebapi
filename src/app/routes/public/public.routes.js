const express = require("express")
const app = express()

const AuthenticationRoutes = require('./routes/authentication.public')
const ContatoRoutes = require('./routes/contato.public')
const PublicacoesRoutes = require('./routes/publicacoes.public')

app.use('/authentication', AuthenticationRoutes)
app.use('/contato', ContatoRoutes)
app.use('/publicacoes', PublicacoesRoutes)

module.exports = app