const express = require('express');
const route = express.Router();
const UniqueValidators = require('../../../validators/unique');

route.get('/unique/usuario/nome', UniqueValidators.uniqueUsuarioNome);
route.get('/unique/usuario/usuario', UniqueValidators.UniqueUsuarioUsuario);
route.get('/unique/usuario/email', UniqueValidators.UniqueUsuarioEmail);
route.get('/unique/contato/nome', UniqueValidators.uniqueContatoNome);
route.get('/unique/integrantes/nome', UniqueValidators.uniqueIntegranteNome);
route.get('/unique/processo-seletivo/titulo', UniqueValidators.uniqueProcessoSeletivoTitulo);
route.get('/unique/categoria/nome', UniqueValidators.uniqueCategoriaNome)
route.get('/unique/publicacoes/titulo', UniqueValidators.uniquePublicacaoTitulo)
route.get('/unique/usuario/nome', UniqueValidators.uniqueUsuarioNome)
route.get('/unique/usuario/usuario', UniqueValidators.UniqueUsuarioUsuario)
route.get('/unique/usuario/email', UniqueValidators.UniqueUsuarioEmail)
route.get('/unique/contato/nome', UniqueValidators.uniqueContatoNome)
<<<<<<< HEAD
route.get('/unique/evento/titulo', UniqueValidators.uniqueEventoTitulo)
=======
>>>>>>> 199d3bc2891e2e0bbff0147b6995401ea65b30c8
route.get('/unique/sobre/titulo', UniqueValidators.uniqueSobreTitulo)

module.exports = route
