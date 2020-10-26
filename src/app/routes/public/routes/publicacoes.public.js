const express = require('express')
const route = express.Router()
const PublicacoesController = require('./../../../controllers/publicacoes')

route.get('/listar-todos', PublicacoesController.getWithParams)

module.exports = route