const express = require('express');
const route = express.Router();
const HomeController = require('./../../../controllers/home');

route.get('/listar-todos', HomeController.getWithParams);

module.exports = route;