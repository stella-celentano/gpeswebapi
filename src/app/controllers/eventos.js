const EventoSchema = require('./../models/eventos')

class Evento {

  create(req, res){
    const body = req.body

    EventoSchema.create(body, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Houve um erro ao processar sua requisição', error: err })
      } else {
        res.status(201).send({ message: "Evento criado com sucesso no banco de dados", evento: data })
      }
    })
  }
}

module.exports = new Evento()