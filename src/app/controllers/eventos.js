const EventoSchema = require('./../models/eventos')

class Evento {

  create(req, res) {
    const body = req.body

    EventoSchema.create(body, (err, evento) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).json({ message: 'Evento criado com sucesso', data: evento })
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
          res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
        } else {
          res.status(200).json({ message: 'Dados recuperados com sucesso', data: data, page: page, limit: limit })
        }
      })
  }
}

module.exports = new Evento()