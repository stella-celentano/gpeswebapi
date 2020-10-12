const express = require('express')
const route = express.Router()
const IntegrantesController = require('../../../controllers/integrantes')

route.post('/criar', IntegrantesController.create)

module.exports = route