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
          res.status(200).json({ message: 'Dados recuperados com sucesso', data: data })
        }
      })
  }

  create(req, res) {
    categoriesSchema.create(req.body, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).json({ message: 'Categoria criada com sucesso', data: data })
      }
    })
  }

}
module.exports = new Categories()