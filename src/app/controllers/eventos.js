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

  getByTitle(req, res) {
    let title = req.params.title.replace(/%20/g, " ")

    EventoSchema.findOne({ titulo: title }, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(200).json({ message: 'Evento recuperado com sucesso', data: data })
      }
    })
  }

  update(req, res) {
    let title = req.params.title.replace(/%20/g, " ")
    let body = req.body
        
    EventoSchema.updateOne({ titulo: title }, { $set: body }, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).json({ message: 'Evento atualizado com sucesso', data: data })
      }
    })
  }

  getWithParams(req, res) {
    let limit = parseInt(req.query.limit)
    let query = {}
    let page = req.query.page
    let skip = limit * (page - 1)
    let { keyword, columnSort, valueSort } = req.query

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