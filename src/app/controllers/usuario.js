const mongoose = require('mongoose')
const UsuarioSchema = require('./../models/usuario')

class Usuario {

    /**Endpoint para buscar todos os usuários na collection usuarios de forma paginada e aceitando os parâmetros: permissão de acesso; ordenação da coluna; ordenação por valor. */
    getWithParams(req, res) {
        const limit = 10
        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { role, columnSort, valueSort } = req.query

        if (role) {
            query['role'] = new RegExp(role, "i")
        }

        UsuarioSchema
            .find(query)
            .select({ "senha": 0 })
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    UsuarioSchema
                        .estimatedDocumentCount()
                        .find(query)
                        .select({ "senha": 0 })
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

    /**Endpoint para buscar usuários na collection usuarios no banco de dados utilizando o ID como condição. */
    getById(req, res) {
        let user = req.params.user

        UsuarioSchema.findOne({ user: { $eq: user } }, { "senha": 0 }, (err, usuario) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Usuário recuperado com sucesso', data: usuario })
            }
        })
    }

    /**Endpoint para atualizar um usuário existente na collection usuarios. */
    update(req, res) {
        const user = req.params.user
        UsuarioSchema.updateOne({ user: user }, { $set: req.body }, (err, usuario) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Usuário atualizado com sucesso', data: usuario })
            }
        })
    }

    /**Endpoint para apagar um usuário existente na collection usuarios. */
    delete(req, res) {
        const user = req.params.user
        UsuarioSchema.deleteOne({ user: user }, (err, usuario) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Usuário apagado com sucesso', data: usuario })
            }
        })
    }
}

module.exports = new Usuario()