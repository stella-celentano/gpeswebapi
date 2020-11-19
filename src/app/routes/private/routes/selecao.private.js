const express = require('express');
const route = express.Router();
const Selecao = require('./../../../controllers/selecao');

route.post('/criar', Selecao.create);

module.exports = route