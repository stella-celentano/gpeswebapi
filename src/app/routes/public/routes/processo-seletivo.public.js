const express = require('express');
const route = express.Router();
const ProcessoSeletivoController = require('./../../../controllers/processo_seletivo');

const InscricaoController = require('./../../../subs/inscricao');

route.get('/listar-todos', ProcessoSeletivoController.getWithParams);

route.post('/criar', InscricaoController.sendMailConfirmSubscribe);

module.exports = route;