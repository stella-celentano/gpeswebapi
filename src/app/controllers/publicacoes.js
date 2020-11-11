const publicacoesSchema = require('./../models/publicacoes')

class Publicacoes {

  create(req, res) {
    publicacoesSchema.create(req.body, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).send({ message: 'Publicação criada com sucesso', data: data })
      }
    })
  }

  update(req, res) {
    let title = req.params.title.replace(/%20/g, " ")
    let body = req.body

    publicacoesSchema.updateOne({ titulo: title }, { $set: body }, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).json({ message: 'Publicação atualizada com sucesso', data: data })
      }
    })
  }

  getByTitle(req, res) {
    let title = req.params.title.replace(/%20/g, " ")

    publicacoesSchema.findOne({ titulo: title }, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(200).json({ message: 'Publicação recuperada com sucesso', data: data })
      }
    })
  }

  /*Por enquanto não terá */
  getPublicacoesByTitleWithoutFiles(req, res) {
    let title = req.params.title.replace(/%20/g, " ")

    publicacoesSchema.findOne({ titulo: { $eq: title } }, (err, document) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(200).json({ message: 'Publicação recuperada com sucesso', data: document })
      }
    })
  }


  getWithParams(req, res) {

    const limit = 10

    let query = {}
    let page = req.query.page
    let skip = limit * (page - 1)
    let { category, dateStart, dateFinish, columnSort, valueSort } = req.query

    if (category) {
      query['categoria'] = new RegExp(category, "i")
    }

    if (dateStart && dateFinish) {
      query['dataPublicacao'] = { $gte: new Date(dateStart), $lte: new Date(dateFinish) }
    }

    if (dateStart && !dateFinish) {
      dateFinish = Date.now()
      query['dataPublicacao'] = { $gte: new Date(dateStart), $lte: new Date(dateFinish) }
    }

    publicacoesSchema
      .find(query)
      .sort([[columnSort, valueSort]])
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
        } else {
          publicacoesSchema
            .estimatedDocumentCount()
            .find(query)
            .exec((err, count) => {
              let totalDocuments = count.length
              if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
              } else {
                if (totalDocuments > 0) {
                  res.status(200).json({
                    message: 'Dados recuperados com sucesso',
                    data: data,
                    page: page,
                    limit: limit,
                    count: totalDocuments,
                  })
                } else {
                  res.status(204).json({
                    message: 'Não há dados para serem exibidos',
                    data: data,
                    page: page,
                    limit: limit,
                    count: totalDocuments,
                  })
                }
              }
            })
        }
      })
  }

  delete(req, res) {
    publicacoesSchema.deleteOne({ _id: req.query.id }, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(200).json({ message: 'Publicação apagada com sucesso', data: data })
      }
    })
  }

}

module.exports = new Publicacoes()