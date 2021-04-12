const express = require('express');
const route = express.Router();
const HomeController = require('./../../../controllers/home');

route.get('/listar-todos', HomeController.getWithParams);
route.get('/listar-um/:title', HomeController.getByTitle);
route.post('/criar', HomeController.create);
route.put('/atualizar/:title', HomeController.update);
route.delete('/apagar/:id', HomeController.delete);

module.exports = route;