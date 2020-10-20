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
                    res.status(200).json({
                        message: 'Dados recuperados com sucesso', 
                        data: data, 
                        page: page,
                        limit: limit
                    })
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
}

module.exports = new Sobre()