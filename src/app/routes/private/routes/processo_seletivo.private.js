const express = require('express');
const route = express.Router();
const ProcessoSeletivo = require('./../../../controllers/processo_seletivo');

route.get('/listar-todos', ProcessoSeletivo.getWithParams);
route.get('/listar-um/:title', ProcessoSeletivo.getByTitle);
route.post('/criar', ProcessoSeletivo.create);
route.put('/atualizar/:title', ProcessoSeletivo.update);
route.put('/atualizar-ordenacao/:title', ProcessoSeletivo.updateOrder);
route.delete('/apagar/:id', ProcessoSeletivo.delete);

module.exports = route