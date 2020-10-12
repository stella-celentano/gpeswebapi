const SobreSchema= require('./../models/sobre')

class Sobre {

    create(req, res){
        const body = req.body

        SobreSchema.create(body, (err, data) => {
            if (err) {
                res.status(500).send({messa: 'Houve um erro ao processar sua requisição', error: err})
            } else {
                res.status(201).send({message: 'Sobre criado com sucesso no banco de dados', sobre: data})
            }
        })
    }
}

module.exports = new Sobre()