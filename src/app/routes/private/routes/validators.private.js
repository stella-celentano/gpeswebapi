const express = require('express')
const route = express.Router()
const UniqueValidators = require('../../../validators/unique')

route.get('/unique/usuario/nome', UniqueValidators.uniqueUsuarioNome)
route.get('/unique/usuario/usuario', UniqueValidators.UniqueUsuarioUsuario)
route.get('/unique/usuario/email', UniqueValidators.UniqueUsuarioEmail)
route.get('/unique/contato/nome', UniqueValidators.uniqueContatoNome)

module.exports = route
