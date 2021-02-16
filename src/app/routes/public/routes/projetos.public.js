const express = require('express')
const route = express.Router()
const ProjetosController = require('./../../../controllers/projetos')

route.get('/listar-atuais', ProjetosController.getAtuaisProjetos);
route.get('/listar-concluidos', ProjetosController.getProjetosConcluidos);

module.exports = route