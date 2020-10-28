const express = require('express');
const route = express.Router();
const SobreController = require('./../../../controllers/sobre');

route.get('/listar-todos', SobreController.getWithParams);

module.exports = route;