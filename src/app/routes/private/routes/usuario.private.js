/**Private */
const express = require('express')
const route = express.Router()
const ResetPassController = require('../../../auth/forgot')
const UsuarioController = require('../../../controllers/usuario')

route.post('/convite', ResetPassController.sendMailCreateUser)
route.get('/reenviar-convite/:email', ResetPassController.resendMailCreateUser)
route.get('/listar-todos', UsuarioController.getWithParams)
route.get('/listar-um/:user', UsuarioController.getById)
route.put('/atualizar/:user', UsuarioController.update)
route.delete('/apagar/:user', UsuarioController.delete)

module.exports = route