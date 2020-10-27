const express = require('express')
const route = express.Router()
const IntegrantesController = require('./../../../controllers/integrantes')

route.get('/listar-atuais', IntegrantesController.getAtuaisIntegrantes);
route.get('/listar-ex', IntegrantesController.getExIntegrantes);
route.get('/listar-um/:nome', IntegrantesController.getByName);

module.exports = route