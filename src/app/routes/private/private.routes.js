const express = require("express")
const app = express()

const UserRoutes = require('./routes/usuario.private')
const ValidatorRoutes = require('./routes/validators.private')
const AnalyticsRoutes = require('./routes/analytics.private')
const ContatoRoutes = require('./routes/contato.private')
const EventoRoutes = require('./routes/eventos.private')

app.use('/usuario', UserRoutes)
app.use('/validators', ValidatorRoutes)
app.use('/analytics', AnalyticsRoutes)
app.use('/contato', ContatoRoutes)
app.use('/eventos', EventoRoutes)

module.exports = app