const projetosSchema = require('./../models/projetos')
const integrantesSchema = require('./../models/integrantes')

class Projetos {
    getWithParams(req, res) {

        const limit = 10

        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query


        projetosSchema
            .find(query)
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    projetosSchema
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
                                        count: totalDocuments
                                    })
                                } else {
                                    res.status(204).json({
                                        message: 'Não há dados para serem exibidos',
                                        data: data,
                                        page: page,
                                        limit: limit,
                                        count: totalDocuments
                                    })
                                }
                            }
                        })
                }
            })
    }

    getProjetoByTitulo(req, res) {
        let titulo = req.params.titulo.replace(/%20/g, " ")

        projetosSchema.findOne({ titulo: { $eq: titulo } }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Projeto recuperado com sucesso', data: data })
            }
        }).populate('integrantes', { nome: 1 })
    }

    create(req, res) {
        const body = req.body
        let idIntegrantes = [{}]

        idIntegrantes = body['integrantes']

        if (idIntegrantes == null) {
            projetosSchema.create(req.body, (err, projeto) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    res.status(201).json({ message: 'Projeto criado com sucesso', data: projeto })
                }
            })
        } else {
            projetosSchema.create(body, (err, projeto) => {
                if (err) {
                    res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    idIntegrantes.forEach(elemento => {
                        integrantesSchema.findById(elemento, (err, integrante) => {
                            if (err) {
                                res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
                            } else {
                                if (integrante.projetosIntegrante == null) {
                                    integrante.projetosIntegrante = [projeto._id]
                                } else {
                                    integrante.projetosIntegrante.push(projeto._id)
                                }
                                integrante.save({}, err => {
                                    if (err) {
                                        res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
                                    }
                                })
                            }
                        })
                    })
                    projeto.save({}, (err) => {
                        if (err) {
                            res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
                        } else {
                            res.status(201).send({ message: 'Projeto criado com sucesso', data: projeto })
                        }
                    })
                }
            })
        }
    }

    update(req, res) {
        let titulo = req.params.titulo.replace(/%20/g, " ")
        let body = req.body
        let idIntegrantes = req.body['integrantes']
        let teste = idIntegrantes

        projetosSchema.findOne({ titulo: { $eq: titulo } }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                if (data.integrantes == null && idIntegrantes.length == 0) {
                    projetosSchema.updateOne({ titulo: titulo }, { $set: body }, (err, result) => {
                        if (err) {
                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                        } else {
                            res.status(201).json({ message: 'Projeto atualizado com sucesso', data: result })
                        }
                    })
                } else if (data.integrantes == null && idIntegrantes.length > 0) {
                    projetosSchema.updateOne({ titulo: titulo }, { $set: body }, (err, result) => {
                        if (err) {
                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                        } else {
                            idIntegrantes.forEach(elemento => {
                                integrantesSchema.findById(elemento, (err, integrante) => {
                                    if (integrante.projetosIntegrante == null) {
                                        integrante.projetosIntegrante = data._id
                                    } else {
                                        integrante.projetosIntegrante.push(data._id)
                                    }
                                    integrante.save({}, (err) => {
                                        if (err) {
                                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                                        }
                                    })
                                })
                            })
                            res.status(201).json({ message: 'Projeto atualizado com sucesso', data: result })
                        }
                    })
                } else {
                    projetosSchema.updateOne({ titulo: titulo }, { $set: body }, (err, result) => {
                        if (err) {
                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                        } else {
                            let idIguais = []
                            data.integrantes.forEach(integrante => {
                                idIntegrantes.forEach(idDosIntegrantes => {
                                    if (integrante == idDosIntegrantes) {
                                        idIguais.push(integrante)
                                    }
                                })
                            })
                            idIguais.forEach(id => {
                                data.integrantes.pull(id)
                                idIntegrantes.splice(id, 1)
                            })
                            if (idIntegrantes.length > 0) {
                                idIntegrantes.forEach(elemento => {
                                    integrantesSchema.findById(elemento, (err, dados) => {
                                        if (err) {
                                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                                        } else {
                                            if (dados.projetosIntegrante == null) {
                                                dados.projetosIntegrante = body._id
                                            } else {
                                                dados.projetosIntegrante.push(body._id)
                                            }
                                            dados.save({}, (err) => {
                                                if (err) {
                                                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                                                }
                                            })
                                        }
                                    })
                                })
                            }
                            if (data.integrantes.length > 0) {
                                data.integrantes.forEach(elemento => {
                                    integrantesSchema.findById(elemento, (err, integrantes) => {
                                        if (err) {
                                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                                        } else {
                                            integrantes.projetosIntegrante.splice(body._id, 1)
                                            if (integrantes.projetosIntegrante < 1) {
                                                integrantes.projetosIntegrante = null
                                            }
                                            integrantes.save({}, (err) => {
                                                if (err) {
                                                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                                                }
                                            })
                                        }
                                    })
                                })
                            }
                            res.status(201).json({ message: 'Projeto atualizado com sucesso', data: result })
                        }
                    })
                }
            }
        })
    }

    delete(req, res) {
        const projetoId = req.params.id

        projetosSchema.findOne({ _id: projetoId }, (err) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
            } else {
                integrantesSchema
                    .find()
                    .where('projetos', projetoId)
                    .exec((err, integrante) => {
                        if (err) {
                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                        } else {
                            integrante.forEach(elemento => {
                                elemento.integrantes.splice(projetoId, 1)
                                if (elemento.integrantes.length < 1) {
                                    elemento.integrantes = null
                                }
                                projetosSchema.updateOne({ _id: elemento._id }, { $set: elemento }, (err) => {
                                    if (err) {
                                        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                                    }
                                })
                            })
                            projetosSchema.deleteOne({ _id: projetoId }, (err, data) => {
                                if (err) {
                                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                                } else {
                                    res.status(200).json({ message: 'Integrante apagado com sucesso', data: data })
                                }
                            })
                        }
                    })
            }
        })
    }
}
module.exports = new Projetos()