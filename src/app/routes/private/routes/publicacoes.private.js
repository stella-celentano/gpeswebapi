const express = require('express')
const route = express.Router()
const Publicacoes = require('./../../../controllers/publicacoes')

route.post('/create', Publicacoes.create)

module.exports = route