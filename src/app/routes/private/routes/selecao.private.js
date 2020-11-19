const express = require('express');
const route = express.Router();
const Selecao = require('./../../../controllers/selecao');

route.get('/listar-todos', Selecao.getWithParams);
route.get('/listar-um/:title', Selecao.getByTitle);
route.post('/criar', Selecao.create);

module.exports = route