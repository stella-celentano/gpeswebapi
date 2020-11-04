const express = require('express')
const route = express.Router()
const SobreController = require('./../../../controllers/sobre')

route.get('/listar-todos', SobreController.getWithParams)
route.post('/criar', SobreController.create)
route.get('/listar-um/:title', SobreController.getByTitle);
route.put('/atualizar-ordenacao/:title', SobreController.updateOrder);


module.exports = route