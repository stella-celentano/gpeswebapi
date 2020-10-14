const express = require('express')
const route = express.Router()
const Publicacoes = require('./../../../controllers/publicacoes')

route.post('/criar', Publicacoes.create)
route.get('/listar-todos', Publicacoes.getWithParams)

module.exports = route