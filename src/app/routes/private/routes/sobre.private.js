const express = require('express')
const route = express.Router()
const SobreController = require('./../../../controllers/sobre')

route.post('/criar', SobreController.create)

module.exports = route