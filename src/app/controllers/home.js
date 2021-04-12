const { count } = require('./../models/home');
const HomeSchema = require('./../models/home');

class Home {

    getWithParams(req, res) {

        let limit = parseInt(req.query.limit);
        let query = {};
        let page = req.query.page;
        let skip = limit * (page - 1);
        let { columnSort, valueSort } = req.query;

        HomeSchema
            .find(query)
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    HomeSchema
                        .find(query)
                        .exec((err, count) => {
                            let totalDocuments = count.length;
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
                                        message: 'Não há dados para serem ser exibidos'
                                    })
                                }
                            }
                        })
                }
            })
    }

    getByTitle(req, res) {
        let title = req.params.title.replace(/%20/g, " ")

        HomeSchema.findOne({ titulo: { $eq: title } }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Informação da Home recuperada com sucesso', data: data })
            }
        })
    }

    create(req, res) {
        const body = req.body;

        HomeSchema.create(body, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
            } else {
                res.status(200).json({ message: 'Informação da Home criada com sucesso', data: data })
            }
        })
    }

    update(req, res) {
        let title = req.params.title.replace(/%20/g, " ");
        const body = req.body;

        HomeSchema.updateOne({ titulo: title }, { $set: body }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Informação da Home atualizada com sucesso', data: data })
            }
        })
    }

    delete(req, res) {
        HomeSchema.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
            } else {
                res.status(200).json({ message: 'Informação da Home apagada com sucesso', data: data })
            }
        })
    }

}

module.exports = new Home();