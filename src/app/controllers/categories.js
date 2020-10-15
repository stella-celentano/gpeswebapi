const categoriesSchema = require('./../models/categories')
const { defineFields } = require('../functions/categories.functions')

class Categories {

  getWithParams(req, res) {
    let { fields } = req.query

    categoriesSchema
      .find({}, defineFields(fields), (err, data) => {
        if (err) {
          res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
        } else {
          res.status(200).json({ message: 'Categorias recuperadas com sucesso', data: data })
        }
      })
  }

  create(req, res) {
    categoriesSchema.create(req.body, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).json({ message: 'Categoria inserida com sucesso', nome: data['nome'] })
      }
    })
  }

}
module.exports = new Categories()