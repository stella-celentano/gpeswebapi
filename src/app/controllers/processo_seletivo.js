const ProcessoSeletivoSchama = require('./../models/processo_seletivo')

class ProcessoSeletivo {

    getWithParams(req, res) {

        let limit = parseInt(req.query.limit)
        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query

        ProcessoSeletivoSchama
            .find(query)
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    ProcessoSeletivoSchama
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
                                        message: 'Não há dados para serem exibidos'
                                    })
                                }
                            }
                        })
                }
            })
    }
    
    getByTitle(req, res) {
        let title = req.params.title.replace(/%20/g, " ")

        ProcessoSeletivoSchama.findOne({ titulo: { $eq: title } }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Processo Seletivo recuperado com sucesso', data: data })
            }
        })
    }

    create(req, res) {
        ProcessoSeletivoSchama.create(req.body, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Processo Seletivo criado com sucesso', data: data })
            }
        })
    }

    update(req, res) {
        let title = req.params.title.replace(/%20/g, " ")
        let body = req.body
        
        ProcessoSeletivoSchama.updateOne({ titulo: title }, { $set: body }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Processo Seletivo atualizado com sucesso', data: data })
            }
        })
    }

    updateOrder(req, res) {
        let title = req.params.title.replace(/%20/g, " ")
        const body = req.body

        ProcessoSeletivoSchama.updateOne({ titulo: title }, { $set: body }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Processo Seletivo atualizado com sucesso', data: data })
            }
        })
    }
}

module.exports = new ProcessoSeletivo()