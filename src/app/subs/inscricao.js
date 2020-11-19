const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const InscricaoSchema = require('./../models/inscricao');
const SelecaoSchema = require('./../models/selecao');

const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err
        } else {
            callback(null, html)
        }
    })
}

/**Função para criar o transportador, responsável por enviar os e-mails da API */
const smtpTransport = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secureConnection: false,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.MESSENGER_MAIL,
        pass: process.env.MESSENGER_PASS
    }
})

exports.sendMailConfirmSubscribe = function (req, res) {
    const reqBody = req.body;
    const idSelecao = reqBody['selecao'];

    InscricaoSchema.create(reqBody, (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
        } else {
            SelecaoSchema.findById(idSelecao, (err, selecao) => {
                if (err) {
                    res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                } else {
                    selecao.inscritos.push(data)
                    selecao.save({}, (err) => {
                        if (err) {
                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
                        } else {
                            const email = data.email

                            readHTMLFile(__dirname + '/template/confirm-subs.html', function (err, html) {
                                if (err) {
                                    console.log(`Erro ao ler o HTML => ${err}`)
                                } else {
                                    /**Compila o arquivo HTML utilizando handlebars */
                                    let template = handlebars.compile(html)
                                    /**Processa os dados que serão recolocados no template */
                                    let replacements = {
                                        url: process.env.MESSENGER_URL_CREATE,
                                        name: data.nome
                                    }
                                    /**Adiciona os dados recolocados no template */
                                    let htmlToSend = template(replacements)
                                    /**Define para quem será enviado o email, de qual email, qual corpo da mensagem e qual assunto da mensagem */
                                    let mailOptions = {
                                        to: email,
                                        from: process.env.MESSENGER_MAIL,
                                        html: htmlToSend,
                                        subject: 'Confirmação de Inscrição | GPES'
                                    }

                                    /**Realiza o envio do e-mail */
                                    smtpTransport.sendMail(mailOptions, function (err) {
                                        if (err) {
                                            console.log(err)
                                            res.status(442).json({ message: "Serviço indisponível" })
                                        } else {
                                            res.status(201).json({ message: 'Inscrição criada com sucesso', data: data })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}