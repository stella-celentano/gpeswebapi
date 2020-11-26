const express = require('express');
const route = express.Router();
const ProcessoSeletivoController = require('./../../../controllers/processo_seletivo');
const InscricaoController = require('./../../../subs/inscricao');
const SelecaoController = require('./../../../controllers/selecao');

route.get('/listar-todos', ProcessoSeletivoController.getWithParams);
route.get('/selecao-aberta', SelecaoController.getSelecaoAberta);
route.post('/criar', InscricaoController.sendMailConfirmSubscribe);

module.exports = route;