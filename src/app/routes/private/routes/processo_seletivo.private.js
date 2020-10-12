const express = require('express')
const route = express.Router()
const ProcessoSeletivo = require('./../../../controllers/processo_seletivo')

route.post('/criar', ProcessoSeletivo.create);

module.exports = route