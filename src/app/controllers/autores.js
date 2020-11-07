const autoresSchema = require('./../models/autores')

class Autores {

  getWithParams(req, res) {
    let { fields } = req.query

    autoresSchema
      .find({}, { nome: 1, _id: 0 }, (err, data) => {
        if (err) {
          res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
        } else {
          res.status(200).json({ message: 'Dados recuperados com sucesso', data: data })
        }
      })
  }

  create(req, res) {
    autoresSchema.create(req.body, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).json({ message: 'Autor criado com sucesso', data: data })
      }
    })
  }

}
module.exports = new Autores()