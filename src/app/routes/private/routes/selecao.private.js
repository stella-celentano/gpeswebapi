const express = require('express');
const route = express.Router();
const Selecao = require('./../../../controllers/selecao');

route.get('/listar-todos', Selecao.getWithParams);
route.get('/listar-um/:title', Selecao.getByTitle);
route.get('/listar-um/:title/chart', Selecao.getDataForChart);
route.get('/listar-um-inscrito/:name', Selecao.getByNameInscrito);
route.put('/atualizar/:title', Selecao.update);
route.post('/criar', Selecao.create);
route.post('/listar-um/:title/enviar-email', Selecao.sendEmail);
route.delete('/apagar/:id', Selecao.delete);

module.exports = route