const express = require('express')
const route = express.Router()
const AutoresController = require('./../../../controllers/autores')

route.get('/listar', AutoresController.getWithParams)
route.post('/criar', AutoresController.create)

module.exports = route