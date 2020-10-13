const integrantesSchema = require('./../models/integrantes')

class Integrantes {
    create(req, res) {
        integrantesSchema.create(req.body, (err, integrantes) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Integrante inserido com sucesso', data: integrantes })
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

        integrantesSchema
            .find(query)
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                }
                else if (Array.isArray(data) && data.length == 0) {
                    res.status(200).json({ message: 'Não foram encontrados dados para os termos da pesquisa! Tente pesquisar novamente' })
                } else {
                    integrantesSchema
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
}
module.exports = new Integrantes()