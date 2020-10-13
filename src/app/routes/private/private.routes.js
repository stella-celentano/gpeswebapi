const express = require("express")
const app = express()

const UserRoutes = require('./routes/usuario.private')
const ValidatorRoutes = require('./routes/validators.private')
const AnalyticsRoutes = require('./routes/analytics.private')
const PublicacoesRoutes = require('./routes/publicacoes.private')

app.use('/usuario', UserRoutes)
app.use('/validators', ValidatorRoutes)
app.use('/analytics', AnalyticsRoutes)
app.use('/publicacoes', PublicacoesRoutes)

module.exports = app