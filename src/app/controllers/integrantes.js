const integrantesSchema = require('./../models/integrantes')

class Integrantes{
    create(req, res) {
        integrantesSchema.create(req.body, (err, integrantes) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Integrante inserido com sucesso', data: integrante })
            }
        })
    }
}

module.exports = new Integrantes()