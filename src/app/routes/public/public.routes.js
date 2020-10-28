const express = require("express");
const app = express();

const AuthenticationRoutes = require('./routes/authentication.public');
const ContatoRoutes = require('./routes/contato.public');
const ProcessoSeletivoRoutes = require('./routes/processo-seletivo.public');
const SobreRoutes = require('./routes/sobre.public');

app.use('/authentication', AuthenticationRoutes);
app.use('/contato', ContatoRoutes);
app.use('/processo-seletivo', ProcessoSeletivoRoutes);
app.use('/sobre', SobreRoutes);

module.exports = app