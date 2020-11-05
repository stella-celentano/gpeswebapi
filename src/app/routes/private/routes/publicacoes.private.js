const express = require('express')
const route = express.Router()
const Publicacoes = require('./../../../controllers/publicacoes')

route.post('/criar', Publicacoes.create)
route.get('/listar-todos', Publicacoes.getWithParams)
route.get('/listar-um/:title', Publicacoes.getByTitle)
route.get('/getdata/:title', Publicacoes.getPublicacoesByTitleWithoutFiles)
route.put('/atualizar/:title', Publicacoes.update)

module.exports = route