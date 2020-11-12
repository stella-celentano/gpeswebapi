const express = require('express');
const route = express.Router();
const UniqueValidators = require('../../../validators/unique');

route.get('/unique/inscricao/nome', UniqueValidators.uniqueInscricaoNome);
route.get('/unique/inscricao/email', UniqueValidators.uniqueInscricaoEmail);
route.get('/unique/inscricao/ra', UniqueValidators.uniqueInscricaoRa);

module.exports = route