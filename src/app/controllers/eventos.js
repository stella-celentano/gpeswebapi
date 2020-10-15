const EventoSchema = require('./../models/eventos')

class Evento {

  create(req, res) {
    const body = req.body

    EventoSchema.create(body, (err, data) => {
      if (err) {
        res.status(500).send({
          message: 'Houve um erro ao processar sua requisição',
          error: err
        })
      } else {
        res.status(201).send({
          message: "Evento criado com sucesso no banco de dados",
          evento: data
        })
      }
    })
  }

  getWithParams(req, res) {
    let limit = parseInt(req.query.limit)
    let query = {}
    let page = req.query.page
    let skip = limit * (page - 1)
    let {
      columnSort,
      valueSort
    } = req.query

    EventoSchema
      .find(query)
      .sort([[columnSort, valueSort]])
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: 'Houve um erro ao processar sua requisição', err: err })
        } else {
          res.status(200).send({ message: 'Dados recuperados com sucesso', data: data, page: page, limit: limit })
        }
      })
  }
}

module.exports = new Evento()