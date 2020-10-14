const express = require('express')
const route = express.Router()
const CategoriesController = require('./../../../controllers/categories')

route.get('/listar', CategoriesController.getWithParams)
route.post('/criar', CategoriesController.create)

module.exports = route