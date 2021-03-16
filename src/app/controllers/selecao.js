const SelecaoSchema = require('./../models/selecao');
const InscricaoSchema = require('./../models/inscricao');
const { count } = require('./../models/selecao');

class Selecao {

    getWithParams(req, res) {

        let limit = parseInt(req.query.limit)
        let query = {}
        let page = req.query.page
        let skip = limit * (page - 1)
        let { columnSort, valueSort } = req.query

        SelecaoSchema
            .find(query)
            .sort([[columnSort, valueSort]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', err: err })
                } else {
                    SelecaoSchema
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

    getByTitle(req, res) {
        let title = req.params.title.replace(/%20/g, " ")

        SelecaoSchema.findOne({ titulo: { $eq: title } })
            .populate('inscritos', { nome: 1, email: 1, telefone: 1, cidade: 1, ra: 1, curso: 1, periodo: 1, semestre: 1, descricao: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    res.status(200).json({ message: 'Seleção recuperada com sucesso', data: data })
                }
            })
    }

    getDataForChart(req, res) {
        let title = req.params.title.replace(/%20/g, " ")
        let totalAds = 0
        let totalSi = 0
        let totalMatutino = 0
        let totalVespertino = 0
        let totalNoturno = 0
        let totalSemestre1 = 0
        let totalSemestre2 = 0
        let totalSemestre3 = 0
        let totalSemestre4 = 0
        let totalSemestre5 = 0
        let totalSemestre6 = 0
        let totalSemestre7 = 0
        let totalSemestre8 = 0


        SelecaoSchema.findOne({ titulo: { $eq: title } })
            .populate('inscritos', { nome: 1, email: 1, telefone: 1, cidade: 1, ra: 1, curso: 1, periodo: 1, semestre: 1, descricao: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    InscricaoSchema.find({ selecao: data.id}, (err, inscritos) =>{
                        if (err) {
                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                        } else {
                            let totalInscritos = inscritos.length;
                            for (let inscrito in inscritos){
                                if (inscritos[inscrito]['curso'] == 'Análise e Desenvolvimento de Sistemas'){
                                    totalAds++;
                                } else if (inscritos[inscrito]['curso'] == 'Sistemas para Internet'){
                                    totalSi++;
                                }

                                if (inscritos[inscrito]['periodo'] == 'Matutino'){
                                    totalMatutino++;
                                } else if (inscritos[inscrito]['periodo'] == 'Vespertino'){
                                    totalVespertino++;
                                } else if (inscritos[inscrito]['periodo'] == 'Noturno'){
                                    totalNoturno++;
                                }

                                if (inscritos[inscrito]['semestre'] == '1º semestre'){
                                    totalSemestre1++;
                                } else if (inscritos[inscrito]['semestre'] == '2º semestre'){
                                    totalSemestre2++;
                                } else if (inscritos[inscrito]['semestre'] == '3º semestre'){
                                    totalSemestre3++;
                                } else if (inscritos[inscrito]['semestre'] == '4º semestre'){
                                    totalSemestre4++;
                                } else if (inscritos[inscrito]['semestre'] == '5º semestre'){
                                    totalSemestre5++;
                                } else if (inscritos[inscrito]['semestre'] == '6º semestre'){
                                    totalSemestre6++;
                                } else if (inscritos[inscrito]['semestre'] == '7º semestre'){
                                    totalSemestre7++;
                                } else if (inscritos[inscrito]['semestre'] == '8º semestre'){
                                    totalSemestre8++;
                                }        
                            }

                            let cursoData = [
                                {
                                    name: "Análise e Desenvolvimento de Sistemas", 
                                    value: totalAds
                                },
                                {
                                    name: "Sistemas para Internet",
                                    value: totalSi
                                }
                            ]

                            let periodoData= [
                                {
                                    name: "Matutino",
                                    value: totalMatutino
                                },
                                {
                                    name: "Vespertino",
                                    value: totalVespertino
                                },
                                {
                                    name: "Noturno",
                                    value: totalNoturno
                                }
                            ]

                            let semestreData= [
                                {
                                    name: "1º semestre",
                                    value: totalSemestre1
                                },
                                {
                                    name: "2º semestre",
                                    value: totalSemestre2
                                },
                                {
                                    name: "3º semestre",
                                    value: totalSemestre3
                                },
                                {
                                    name: "4º semestre",
                                    value: totalSemestre4
                                },
                                {
                                    name: "5º semestre",
                                    value: totalSemestre5
                                },                               
                                {
                                    name: "6º semestre",
                                    value: totalSemestre6
                                },                               
                                {
                                    name: "7º semestre",
                                    value: totalSemestre7
                                },                               
                                {
                                    name: "8º semestre",
                                    value: totalSemestre8
                                }                                                                            
                            ]
                            
                            let dataChart = {
                                cursoData: cursoData,
                                periodoData: periodoData,
                                semestreData: semestreData
                            }
                            res.status(200).json({ message: 'Os dados para o gráfico são: ', data: dataChart})      

                        }
                    })
                    
                }
            })
    }

    getSelecaoAberta(req, res) {
        SelecaoSchema
            .where('status').equals(true)
            .where('dataInicio').lte(new Date)
            .where('dataFim').gte(new Date)
            .estimatedDocumentCount()
            .find({})
            .exec((err, data) => {
                let totalDocuments = count.length
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    if (totalDocuments > 0) {
                        res.status(200).json({
                            message: 'Seleção recuperada com sucesso',
                            data: data,
                            count: totalDocuments
                        })
                    } else {
                        res.status(204).json({
                            message: 'Não há seleção aberta no momento',
                            data: data,
                            count: totalDocuments
                        })
                    }
                }
            })
    }

    getByNameInscrito(req, res) {
        let name = req.params.name.replace(/%20/g, " ")

        InscricaoSchema.findOne({ nome: { $eq: name } }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Inscrito recuperado com sucesso', data: data })
            }
        })
    }

    create(req, res) {
        SelecaoSchema.create(req.body, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Seleção aberta com sucesso', data: data })
            }
        })
    }

    update(req, res) {
        let title = req.params.title.replace(/%20/g, " ")
        let body = req.body

        SelecaoSchema.updateOne({ titulo: title }, { $set: body }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Seleção atualizada com sucesso', data: data })
            }
        })
    }

    delete(req, res) {
        const { id } = req.params;

        SelecaoSchema.findOne({ _id: id }, (err) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                InscricaoSchema.deleteMany({ selecao: id }, (err) => {
                    if (err) {
                        res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                    } else {
                        SelecaoSchema.deleteOne({ _id: id }, (err, data) => {
                            if (err) {
                                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                            } else {
                                res.status(200).json({ message: 'Processo Seletivo apagado com sucesso', data: data })
                            }
                        })
                    }
                })
            }
        })
    }
}

module.exports = new Selecao();