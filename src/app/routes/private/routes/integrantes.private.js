const express = require('express')
const route = express.Router()
const IntegrantesController = require('../../../controllers/integrantes')
const integrantes = require('../../../models/integrantes')

route.post('/criar', IntegrantesController.create)
route.get('/listar-todos', IntegrantesController.getWithParams)
route.get('/listar-um/:nome', IntegrantesController.getByName);
route.put('/atualizar/:nome',IntegrantesController.update);

module.exports = route