const { count } = require('./../models/sobre')
const SobreSchema = require('./../models/sobre')

class Sobre {

    getWithParams(req, res) {

        let limit = parseInt(req.query.limit)
        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query

        SobreSchema
            .find(query)
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    SobreSchema
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

        SobreSchema.findOne({ titulo: { $eq: title } }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Sobre recuperado com sucesso', data: data })
            }
        })
    }

    getByPrincipal(req, res) {
        SobreSchema
            .where('principal').equals(true)
            .find({})
            .exec((err, data) => {
                let totalPrincipal = count.length;
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    if (totalPrincipal > 0) {
                        res.status(200).json({
                            message: 'Sobre Principal recuperado com sucesso',
                            data: data,
                            count: totalPrincipal
                        })
                    } else {
                        res.status(204).json({
                            message: 'Não há um sobre principal cadastrado',
                            data: data,
                            count: totalPrincipal
                        })
                    }
                }
            })
    }

    create(req, res) {
        const body = req.body

        SobreSchema.create(body, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).send({ message: 'Sobre criado com sucesso', sobre: data })
            }
        })
    }

    update(req, res) {
        let title = req.params.title.replace(/%20/g, " ")
        let body = req.body

        SobreSchema.updateOne({ titulo: title }, { $set: body }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Sobre atualizado com sucesso', data: data })
            }
        })
    }

    updateOrder(req, res) {
        let title = req.params.title.replace(/%20/g, " ")
        const body = req.body

        SobreSchema.updateOne({ titulo: title }, { $set: body }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Sobre atualizado com sucesso', data: data })
            }
        })
    }

    updatePrincipal(req, res) {
        SobreSchema.updateMany({}, { principal: false }, { multi: true }, function () { })
        SobreSchema.updateOne({ _id: req.params.id }, { principal: true }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Sobre atualizado com sucesso', data: data })
            }
        })
    }

    delete(req, res) {
        SobreSchema.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Sobre apagado com sucesso', data: data })
            }
        })
    }


}

module.exports = new Sobre()