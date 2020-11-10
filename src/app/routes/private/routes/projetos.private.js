const express = require('express')
const route = express.Router()
const ProjetosController = require('./../../../controllers/projetos')

route.get('/listar-todos', ProjetosController.getWithParams);
route.post('/criar', ProjetosController.create);
route.put('/atualizar/:titulo', ProjetosController.update);

module.exports = route