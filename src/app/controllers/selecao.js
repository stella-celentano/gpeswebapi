const SelecaoSchema = require('./../models/selecao');

class Selecao {
    create(req, res) {
        SelecaoSchema.create(req.body, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Seleção aberta com sucesso', data: data })
            }
        })
    }
}

module.exports = new Selecao();