const express = require("express");
const app = express();

const AuthenticationRoutes = require('./routes/authentication.public');
const ContatoRoutes = require('./routes/contato.public');
const ProcessoSeletivoRoutes = require('./routes/processo-seletivo.public');
<<<<<<< HEAD
const IntegrantesRoutes = require('./routes/integrantes.public');
=======
>>>>>>> 8256d18436400d5293da1d9a8c2fa368dc3b95ad
const SobreRoutes = require('./routes/sobre.public');

app.use('/authentication', AuthenticationRoutes)
app.use('/contato', ContatoRoutes)
app.use('/processo-seletivo', ProcessoSeletivoRoutes);
<<<<<<< HEAD
app.use('/integrantes', IntegrantesRoutes)
=======
>>>>>>> 8256d18436400d5293da1d9a8c2fa368dc3b95ad
app.use('/sobre', SobreRoutes);

module.exports = app