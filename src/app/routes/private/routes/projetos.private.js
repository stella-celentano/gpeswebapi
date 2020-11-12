const express = require('express')
const route = express.Router()
const ProjetosController = require('./../../../controllers/projetos')

route.get('/listar-todos', ProjetosController.getWithParams);
route.get('/listar-um/:titulo', ProjetosController.getProjetoByTitulo);
route.post('/criar', ProjetosController.create);
route.put('/atualizar/:titulo', ProjetosController.update);
route.delete('/apagar/:id', ProjetosController.delete);

module.exports = route