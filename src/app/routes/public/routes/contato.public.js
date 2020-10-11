const express = require('express')
const route = express.Router()
const ContatoController = require('./../../../controllers/contato')

route.get('/listar-todos', ContatoController.getAll)

module.exports = route