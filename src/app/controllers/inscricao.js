const InscricaoSchema = require('./../models/inscricao');

class Inscricao {

    create(req, res) {
        InscricaoSchema.create(req.body, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Inscrição criada com sucesso', data: data })
            }
        })
    }

}

module.exports = new Inscricao()