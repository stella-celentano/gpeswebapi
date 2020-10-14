const express = require("express")
const app = express()

const UserRoutes = require('./routes/usuario.private')
const ValidatorRoutes = require('./routes/validators.private')
const AnalyticsRoutes = require('./routes/analytics.private')
const ContatoRoutes = require('./routes/contato.private')
const ProcessoSeletivo = require('./routes/processo_seletivo.private')
const IntegrantesRoutes = require('./routes/integrantes.private')
const PublicacoesRoutes = require('./routes/publicacoes.private')
const CategoriesRoutes = require('./routes/categories.private')

app.use('/usuario', UserRoutes)
app.use('/validators', ValidatorRoutes)
app.use('/analytics', AnalyticsRoutes)
app.use('/contato', ContatoRoutes)
app.use('/processo-seletivo', ProcessoSeletivo)
app.use('/integrantes', IntegrantesRoutes)
app.use('/publicacoes', PublicacoesRoutes)
app.use('/categories', CategoriesRoutes)

module.exports = app