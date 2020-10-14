const express = require("express")
const app = express()

const UserRoutes = require('./routes/usuario.private')
const ValidatorRoutes = require('./routes/validators.private')
const AnalyticsRoutes = require('./routes/analytics.private')
const ContatoRoutes = require('./routes/contato.private')
<<<<<<< HEAD
const ProcessoSeletivo = require('./routes/processo_seletivo.private')
const IntegrantesRoutes = require('./routes/integrantes.private')
const PublicacoesRoutes = require('./routes/publicacoes.private')
const CategoriesRoutes = require('./routes/categories.private')
const EventoRoutes = require('./routes/eventos.private')
=======
>>>>>>> 199d3bc2891e2e0bbff0147b6995401ea65b30c8
const SobreRoutes= require('./routes/sobre.private')

app.use('/usuario', UserRoutes)
app.use('/validators', ValidatorRoutes)
app.use('/analytics', AnalyticsRoutes)
app.use('/contato', ContatoRoutes)
<<<<<<< HEAD
app.use('/processo-seletivo', ProcessoSeletivo)
app.use('/integrantes', IntegrantesRoutes)
app.use('/publicacoes', PublicacoesRoutes)
app.use('/categories', CategoriesRoutes)
app.use('/eventos', EventoRoutes)
=======
>>>>>>> 199d3bc2891e2e0bbff0147b6995401ea65b30c8
app.use('/sobre', SobreRoutes)

module.exports = app