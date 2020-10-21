const { count } = require('./../models/eventos')
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
    const limit = 10
    let query = {}
    let page = req.query.page
    let skip = limit * (page - 1)
    let { keyword, category, columnSort, valueSort } = req.query

    if (category) {
      query['tipo'] = new RegExp(category, "i")
    }

    if (keyword) {
      query = { $text: { $search: `"\"${keyword}\""` } }
    }

    EventoSchema
      .find(query)
      .sort([[columnSort, valueSort]])
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
        } else {
          EventoSchema
            .estimatedDocumentCount()
            .find(query)
            .exec((err, count) => {
              let totalDocuments = count.length
              if (err) {
                res.status(500).json({ message: 'Houve um erro ao processor sua requisição', error: err })
              } else {
                if (totalDocuments > 0) {
                  res.status(200).json({ message: 'Dados recuperados com sucesso', data: data, page: page, limit: limit, count: totalDocuments })
                } else {
                  res.status(204).json({ message: 'Não há dados para serem exibidos' })
                }
              }
            })
        }
      })
  }
  
}

module.exports = new Evento()