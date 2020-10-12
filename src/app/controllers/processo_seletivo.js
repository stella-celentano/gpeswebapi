const ProcessoSeletivoSchama = require('./../models/processo_seletivo')

class ProcessoSeletivo {
    create(req, res) {
        ProcessoSeletivoSchama.create(req.body, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Processo Seletivo criado com sucesso', data: data })
            }
        })
    }
}

module.exports = new ProcessoSeletivo()