const express = require('express')
const route = express.Router()
const ContatoController = require('./../../../controllers/contato')

route.get('/listar-todos', ContatoController.get)
route.get('/listar-um/:descricao', ContatoController.getContatoByDescricao)
route.post('/criar', ContatoController.create)
route.put('/atualizar/:id', ContatoController.update)
route.delete('/apagar/:id', ContatoController.delete)

module.exports = route