const express = require('express');
const route = express.Router();
const ProcessoSeletivo = require('./../../../controllers/processo_seletivo');

route.post('/criar', ProcessoSeletivo.create);
route.get('/listar-todos', ProcessoSeletivo.getWithParams);
route.get('/listar-um/:title', ProcessoSeletivo.getByTitle);

module.exports = route