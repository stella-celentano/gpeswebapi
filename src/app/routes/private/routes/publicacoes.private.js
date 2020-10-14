const express = require('express')
const route = express.Router()
const Publicacoes = require('./../../../controllers/publicacoes')

<<<<<<< HEAD
route.post('/create', Publicacoes.create)
=======
route.post('/criar', Publicacoes.create)
route.get('/listar-todos', Publicacoes.getWithParams)
>>>>>>> 72dfc69... Implementando o método getWithParams e a rota listar-todos para corrigir um erro

module.exports = route