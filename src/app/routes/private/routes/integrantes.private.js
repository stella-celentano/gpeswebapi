const express = require('express')
const route = express.Router()
const IntegrantesController = require('../../../controllers/integrantes')

route.post('/criar', IntegrantesController.create)
route.get('/listar-todos', IntegrantesController.getWithParams)

module.exports = route