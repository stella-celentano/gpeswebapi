const express = require("express");
const app = express();

const AuthenticationRoutes = require('./routes/authentication.public');
const ContatoRoutes = require('./routes/contato.public');
const ProcessoSeletivoRoutes = require('./routes/processo-seletivo.public');
<<<<<<< HEAD
const IntegrantesRoutes = require('./routes/integrantes.public');
const SobreRoutes = require('./routes/sobre.public');
=======
>>>>>>> b2ee411f8feff166da00e727fd6b846f751e0f3c
const EventoRoutes = require('./routes/eventos.public');

app.use('/authentication', AuthenticationRoutes)
app.use('/contato', ContatoRoutes)
app.use('/processo-seletivo', ProcessoSeletivoRoutes);
<<<<<<< HEAD
app.use('/integrantes', IntegrantesRoutes)
app.use('/sobre', SobreRoutes);
=======
>>>>>>> b2ee411f8feff166da00e727fd6b846f751e0f3c
app.use('/eventos', EventoRoutes);

module.exports = app