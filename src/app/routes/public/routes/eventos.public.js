const express = require('express');
const route = express.Router();
const EventoController = require('./../../../controllers/eventos');

route.get('/listar-todos', EventoController.getWithParams);
route.get('/listar-um/:title', EventoController.getByTitle);

module.exports = route;