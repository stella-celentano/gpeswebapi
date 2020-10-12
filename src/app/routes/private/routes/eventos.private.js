const express = require('express')
const route = express.Router()
const EventoController = require('./../../../controllers/eventos')

route.post('/criar', EventoController.create)

module.exports =  route