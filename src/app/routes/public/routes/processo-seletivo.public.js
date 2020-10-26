const express = require('express');
const route = express.Router();
const ProcessoSeletivoController = require('./../../../controllers/processo_seletivo');

route.get('/listar-todos', ProcessoSeletivoController.getWithParams);

module.exports = route;