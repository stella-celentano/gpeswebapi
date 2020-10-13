const publicacoesSchema = require('./../models/publicacoes')

class Publicacoes {

  create(req, res) {
    publicacoesSchema.create(req.body, (err, publicacao) => {
      if (err) {
        res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).send({ message: 'Publicação inserida com sucesso', data: publicacao })
      }
    })
  }

}

module.exports = new Publicacoes()