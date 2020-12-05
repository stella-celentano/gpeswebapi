const SelecaoSchema = require('./../models/selecao');
const InscricaoSchema = require('./../models/inscricao');
const { count } = require('./../models/selecao');

class Selecao {

    getWithParams(req, res) {

        let limit = parseInt(req.query.limit)
        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query

        SelecaoSchema
            .find(query)
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    SelecaoSchema
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

        SelecaoSchema.findOne({ titulo: { $eq: title } })
            .populate('inscritos', { nome: 1, email: 1, curso: 1, semestre: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    res.status(200).json({ message: 'Seleção recuperada com sucesso', data: data })
                }
            })
    }

    getSelecaoAberta(req, res) {
        SelecaoSchema
            .where('status').equals(true)
            .where('dataInicio').lte(new Date)
            .where('dataFim').gte(new Date)
            .estimatedDocumentCount()
            .find({})
            .exec((err, data) => {
                let totalDocuments = count.length
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    if (totalDocuments > 0) {
                        res.status(200).json({
                            message: 'Seleção recuperada com sucesso',
                            data: data,
                            count: totalDocuments
                        })
                    } else {
                        res.status(204).json({
                            message: 'Não há seleção aberta no momento',
                            data: data,
                            count: totalDocuments
                        })
                    }
                }
            })
    }

    getByNameInscrito(req, res) {
        let name = req.params.name.replace(/%20/g, " ")

        InscricaoSchema.findOne({ nome: { $eq: name } }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Inscrito recuperado com sucesso', data: data })
            }
        })
    }

    create(req, res) {
        SelecaoSchema.create(req.body, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Seleção aberta com sucesso', data: data })
            }
        })
    }

    update(req, res) {
        let title = req.params.title.replace(/%20/g, " ")
        let body = req.body

        SelecaoSchema.updateOne({ titulo: title }, { $set: body }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Seleção atualizada com sucesso', data: data })
            }
        })
    }

    delete(req, res) {
        const { id } = req.params;

        SelecaoSchema.findOne({ _id: id }, (err) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                InscricaoSchema.deleteMany({ selecao: id }, (err) => {
                    if (err) {
                        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                    } else {
                        SelecaoSchema.deleteOne({ _id: id }, (err, data) => {
                            if (err) {
                                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                            } else {
                                res.status(200).json({ message: 'Processo Seletivo apagado com sucesso', data: data })
                            }
                        })
                    }
                })
            }
        })
    }
}

module.exports = new Selecao();