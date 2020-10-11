const contatoSchema = require('./../models/contato')

class Contato {

    get(req, res) {

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

        contatoSchema
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
                    contatoSchema
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

    getAll(req, res) {
        contatoSchema.find({}, (err, result) => {
            if (err)
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            else
                res.status(200).json({ message: 'Contato recuperado com sucesso', data: result })
        })
    }

    getContatoByDescricao(req, res) {
        let descricao = req.params.descricao.replace(/%20/g, " ")

        contatoSchema.findOne({ descricao: { $eq: descricao } }, (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Contato recuperado com sucesso', data: result })
            }
        })
    }

    create(req, res) {
        contatoSchema.create(req.body, (err, contato) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Contato inserido com sucesso', data: contato })
            }
        })
    }

    update(req, res) {
        contatoSchema.updateOne({ _id: req.params.id }, { $set: req.body }, (err, contato) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Contato atualizado com sucesso', data: contato })
            }
        })
    }

    delete(req, res) {
        contatoSchema.deleteOne({ _id: req.params.id }, (err, contato) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Contato apagado com sucesso', data: contato })
            }
        })
    }
}

module.exports = new Contato()
