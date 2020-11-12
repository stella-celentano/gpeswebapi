const express = require("express");
const app = express();

const AuthenticationRoutes = require('./routes/authentication.public');
const ContatoRoutes = require('./routes/contato.public');
const ProcessoSeletivoRoutes = require('./routes/processo-seletivo.public');
const IntegrantesRoutes = require('./routes/integrantes.public');
const SobreRoutes = require('./routes/sobre.public');
const PublicacoesRoutes = require('./routes/publicacoes.public');
const EventoRoutes = require('./routes/eventos.public');
const ValidatorsRoutes = require('./routes/validators.public');

app.use('/authentication', AuthenticationRoutes)
app.use('/contato', ContatoRoutes)
app.use('/processo-seletivo', ProcessoSeletivoRoutes);
app.use('/integrantes', IntegrantesRoutes)
app.use('/sobre', SobreRoutes);
app.use('/publicacoes', PublicacoesRoutes)
app.use('/eventos', EventoRoutes);
app.use('/validators', ValidatorsRoutes);

module.exports = app