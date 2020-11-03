const integrantesSchema = require('./../models/integrantes')
const projetosSchema = require('./../models/projetos')

class Integrantes {
    
    create(req, res) {
        const body = req.body
        let idProjetos = [{}]

        idProjetos = body['projetos']

        console.log('body: ', body)
        console.log('projetos: ', idProjetos)

        if (idProjetos == null) {
            integrantesSchema.create(req.body, (err, integrante) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    res.status(201).json({ message: 'Integrante criado com sucesso', data: integrante })
                }
            })
        } else {
            integrantesSchema.create(body, (err, integrante) => {
                if (err) {
                    console.log('quebrou aq')
                    res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    idProjetos.forEach(elemento => {
                        projetosSchema.findById(elemento, (err, projetos) => {
                            console.log('elemento: ', elemento)
                            if (err) {
                                res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
                            } else {
                                projetos.integrantes.push(integrante)
                            }
                        })
                    })
                    integrante.save({}, (err) => {
                        console.log('integrante', integrante)
                        if (err) {
                            res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
                        } else {
                            res.status(201).send({ message: 'Integrante criado com sucesso', data: integrante })
                        }
                    })
                }
            })
        }
    }

    getWithParams(req, res) {

        const limit = 10

        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query


        integrantesSchema
            .find(query)
            .populate('projetosSchema', { nome: 1 })
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    integrantesSchema
                        .estimatedDocumentCount()
                        .find(query)
                        .populate('projetosSchema', { nome: 1 })
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

    getByName(req, res) {
        let nome = req.params.nome.replace(/%20/g, " ")

        integrantesSchema.findOne({ nome: { $eq: nome } }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Integrante recuperado com sucesso', data: data })
            }
        })
    }

    update(req, res) {
        let nome = req.params.nome.replace(/%20/g, " ")
        let body = req.body
        
        integrantesSchema.updateOne({ nome: nome }, { $set: body }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Integrante atualizado com sucesso', data: data })
            }
        })
    }

    getAtuaisIntegrantes(req, res){

        const limit = 6

        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query

        integrantesSchema
            .where('situacao', false)
            .find(query)
            .populate('projetosSchema', { nome: 1 })
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    integrantesSchema
                        .where('situacao', false)
                        .estimatedDocumentCount()
                        .find(query)
                        .populate('projetosSchema', { nome: 1 })
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

    getExIntegrantes(req, res) {

        const limit = 6

        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query


        integrantesSchema
            .find(query)
            .where('situacao', true)
            .populate('projetosSchema', { nome: 1 })
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    integrantesSchema
                        .where('situacao', true)
                        .estimatedDocumentCount()
                        .find(query)
                        .populate('projetosSchema', { nome: 1 })
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
        integrantesSchema.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Integrante apagado com sucesso', data: data })
            }
        })
    }
}
module.exports = new Integrantes()