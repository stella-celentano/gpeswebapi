const fs = require('fs')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const handlebars = require('handlebars')
const nodemailer = require('nodemailer')
const UsuarioSchema = require('./../models/usuario')
const ResetPassSchema = require('./../models/resetar_senha')

/**Função que lê os templates HTML que são enviados por e-mail ao usuário */
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

/**Função para reenviar o e-mail de criação de senha do usuário, caso ele não tenha recebido da primeira vez */
exports.resendMailCreateUser = function (req, res) {
    const emailUser = req.params.email

    /**Busca o usuário no banco de dados utilizando o e-mail */
    UsuarioSchema.findOne({ email: { $eq: emailUser } }, (err, usuario) => {
        /**Se não conseguir retornar a busca por erro retorna erro 500 com a mensagem de que houve um problema ao processar a operação */
        if (err) {
            res.status(500).json({ message: "Tivemos um problema ao processar sua operação. Tente novamente mais tarde." })
        } else {
            /**Caso encontre o usuário, busca no banco de dados um token de definição de senha válido */
            ResetPassSchema.findOne({ email: { $eq: emailUser }, isValid: true }, (err, reset) => {
                /**Se não conseguir retornar a busca por erro retorna erro 500 com a mensagem de que houve um problema ao processar a operação */
                if (err) {
                    res.status(500).json({ message: "Tivemos um problema ao processar sua operação. Tente novamente mais tarde." })
                } else {
                    /**Caso encontre o token válido lê o arquivo HTML que contém o template de criação de senha */
                    readHTMLFile(__dirname + '/templates/create-password.html', function (err, html) {
                        if (err) {
                            console.log(`Erro ao ler o HTML => ${err}`)
                        } else {
                            /**Gera o template compilando o HTMl com o handlebars */
                            let template = handlebars.compile(html)
                            /**Processa os dados que serão recolocados no template */
                            let replacements = {
                                url: process.env.MESSENGER_URL_CREATE + reset.token,
                                name: usuario.nome
                            }
                            /**Adiciona os dados recolocados ao template */
                            let htmlToSend = template(replacements)
                            /**Define pra quem será enviado o e-mail, qual e-mail usado, qual o corpo da mensagem e qual o assunto */
                            let mailOptions = {
                                to: emailUser,
                                from: process.env.MESSENGER_MAIL,
                                html: htmlToSend,
                                subject: 'Convite de usuário | GPES Web'
                            }
                            /**Executa o envio do e-mail */
                            smtpTransport.sendMail(mailOptions, function (err) {
                                if (err) {
                                    /**Se o serviço de e-mail estiver indisponível retorna erro 422 com a mensagem de que o serviço está indisponível e loga no console o erro detalhado */
                                    console.log(err)
                                    res.status(442).json({ message: "Serviço indisponível" })
                                } else {
                                    /**Se tudo correr como o esperado retorna sucesso 200 com a mensagem de que o convite foi reenviado com sucesso */
                                    res.status(200).json({ message: "Convite reenviado ao remetente" })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

/**Função para enviar o e-mail de criação de senha do usuário */
exports.sendMailCreateUser = function (req, res) {
    /**Cria um novo usuário no banco de dados */
    UsuarioSchema.create(req.body, (err, usuario) => {
        /**Caso aconteça algum erro retorna erro 500 com a mensagem de que houve um erro ao processar a requisição */
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
        } else {
            /**Caso contrário, gera um token hexadecimal */
            const token = crypto.randomBytes(20).toString('hex')
            const email = usuario.email

            /**Cria um novo token válido no banco de dados */
            ResetPassSchema.create({ email: email, token: token }, (err) => {
                /**Caso aconteça algum erro retorna erro 442 com a mensagem de que houve um erro ao processar a requisição */
                if (err) {
                    res.status(442).json({ message: "Tivemos um problema ao processar sua operação. Tente novamente mais tarde." })
                } else {
                    /**Caso contrário lê o arquivo HTMl de criação de senha */
                    readHTMLFile(__dirname + '/templates/create-password.html', function (err, html) {
                        if (err) {
                            console.log(`Erro ao ler o HTML => ${err}`)
                        } else {
                            /**Compila o arquivo HTML utilizando handlebars */
                            let template = handlebars.compile(html)
                            /**Processa os dados que serão recolocados no template */
                            let replacements = {
                                url: process.env.MESSENGER_URL_CREATE + token,
                                name: usuario.nome
                            }
                            /**Adiciona os dados recolocados no template */
                            let htmlToSend = template(replacements)
                            /**Define para quem será enviado o email, de qual email, qual corpo da mensagem e qual assunto da mensagem */
                            let mailOptions = {
                                to: email,
                                from: process.env.MESSENGER_MAIL,
                                html: htmlToSend,
                                subject: 'Convite de usuário | GPES Web'
                            }
                            /**Realiza o envio do e-mail */
                            smtpTransport.sendMail(mailOptions, function (err) {
                                if (err) {
                                    /**Se o serviço de e-mail estiver indisponível retorna erro 442 com a mensagem de que o serviço está indisponível e loga o erro detalhado */
                                    console.log(err)
                                    res.status(442).json({ message: "Serviço indisponível" })
                                } else {
                                    /**Caso contrário retorna sucesso 200 com a mensagem de que o usuário foi criado com sucesso e um e-mail com as instruções para criação da senha foram enviados para o email informado */
                                    res.status(200).json({ message: "Usuário criado. Um e-mail foi enviado para definição de senha." })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

/**Função para enviar o e-mail de senha esquecida para o usuário */
exports.sendMailForgot = function (req, res) {
    const email = req.body.email

    /**Busca o usuário no banco de dados utilizando o e-mail */
    UsuarioSchema.findOne({ email: email }, (err, usuario) => {
        /**Caso aconteça algum erro retorna erro 500 com a mensagem de que houve um erro ao processar a requisição */
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição' })
        } else {
            /**Se não for encontrado nenhum usuário com o e-mail informado retorna erro 422 com a mensagem de que o e-mail informado não foi encontrado na base de dados */
            if (!usuario) {
                res.status(422).json({ message: 'O e-mail informado não foi encontrado.' })
            } else {
                /**Se for encontrado gera um token hexadecimal */
                const token = crypto.randomBytes(20).toString('hex')

                /**Cria um novo token válido no banco de dados*/
                ResetPassSchema.create({ email: email, token: token }, (err) => {
                    /**Caso aconteça algum erro retorna erro 442 com a mensagem que houve um erro ao processar a requisição e o processo deve ser tentado novamente mais tarde */
                    if (err) {
                        res.status(442).json({ message: 'Tivemos um problema ao processar sua operação. Tente novamente mais tarde' })
                    } else {
                        /**Caso contrário lê o HTML de senha esquecida */
                        readHTMLFile(__dirname + '/templates/forgot-pass.html', function (err, html) {
                            if (err) {
                                console.log(`Erro ao ler HTML => ${err}`)
                                res.status(500).json({ message: 'Houve um erro ao processar sua requisição! Tente novamente mais tarde' })
                            }
                            /**Se não houve nenhum erro o HTML é compilado */
                            var template = handlebars.compile(html)
                            /**Processa os dados que serão recolocados no template */
                            var replacements = {
                                url: process.env.MESSENGER_URL + token,
                                NAME: usuario.nome
                            }
                            /**Adiciona os dados recolodados no template */
                            var htmlToSend = template(replacements)
                            /**Define para quem será enviado o e-mail, de qual e-mail, qual o corpo da mensagem e qual é o assunto da mensagem */
                            var mailOptions = {
                                to: email,
                                from: process.env.MESSENGER_MAIL,
                                html: htmlToSend,
                                subject: 'Redefinição de senha | GPES Web'
                            }
                            /**Realiza o envio do e-mail */
                            smtpTransport.sendMail(mailOptions, function (err) {
                                if (err) {
                                    /**Se houve indisponibilidade no serviço retorna erro 442 com a mensagem de que o serviço está indisponível e loga o erro detalhado */
                                    console.log(err)
                                    res.status(442).json({ message: 'Serviço Indisponível' })
                                } else {
                                    /**Caso contrário retorna sucesso 200 com a mensagem de que o email de recuperação foi enviado com sucesso */
                                    res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada' })
                                }
                            })
                        })
                    }
                })
            }
        }
    })
}

/**Função para definir a nova senha do usuário */
exports.defineNewPassUser = function (req, res) {
    const token = req.params.token
    const newPassword = req.body.senha
    const confirmNewPassword = req.body.confirmaSenha

    /**Busca no banco de dados se existe um token válido */
    ResetPassSchema.findOne({ token: token }, async (err, reset) => {
        /**Se houver algum erro retorna erro 500 com a menssagem de que houve um erro ao processar a requisição */
        if (err) {
            res.status(500).json({ message: "Houve um erro ao processar sua requisição" })
        } else {
            /**Se o token encontrado não for válido retorna erro 442 com a mensagem de que não foi encontrado um convite válido para o usuário */
            if (!reset.isValid) {
                res.status(442).json({ message: "Não encontramos um convite válido para este usuário." })
            } else {
                let idDefine = reset._id
                let emailUser = reset.email
                /**Se as senhas forem iguais entre si, a senha é transformada em string */
                if (newPassword === confirmNewPassword) {
                    JSON.stringify(newPassword)
                    /**É gerado o SALT para encriptar a senha */
                    const salt = await bcrypt.genSaltSync(10)
                    /**Processa o encriptamento da senha */
                    hashPassword = await bcrypt.hash(newPassword, salt)
                    /**Busca o usuário que foi criado e define a senha criada para ele, é definido o usuário como verificado */
                    UsuarioSchema.findOneAndUpdate({ email: emailUser }, { $set: { senha: hashPassword, verified: true } }, (err, usuario) => {
                        /**Se houver algum erro retorna erro 500 com a mensagem de que houve um erro ao processar a requisição */
                        if (err) {
                            console.log(err)
                            res.status(500).json({ message: "Houve um erro ao processar sua requisição" })
                        } else {
                            /**Se não houver retorno do usuário atualizado retorna erro 422 com a mensagem de que ocorreu um erro */
                            if (!usuario) {
                                res.status(422).json({ message: "Ocorreu um erro" })
                            } else {
                                /**Caso contrário lê o HTML de que a criação foi um sucesso */
                                readHTMLFile(__dirname + '/templates/create-success.html', function (err, html) {
                                    if (err) {
                                        res.status(500).json({ message: "Houve um erro ao processar sua requisição. Tente novamente mais tarde." })
                                    } else {
                                        /**O HTML é compilado utilizando handlebars */
                                        let template = handlebars.compile(html)
                                        /**Processa os dados que serão recolodados no template */
                                        let replacements = {
                                            name: usuario.nome
                                        }
                                        /**Adiciona os dados recolocados ao template */
                                        let htmlToSend = template(replacements)
                                        /**Define para quem o e-mail será enviado, de qual e-mail será enviado, o corpo da mensagem e o assunto da mensagem */
                                        let mailOptions = {
                                            to: usuario.email,
                                            from: process.env.MESSENGER_MAIL,
                                            html: htmlToSend,
                                            subject: "Conta verificada | GPES Web"
                                        }
                                        /**Realiza o envio do e-mail */
                                        smtpTransport.sendMail(mailOptions, function (err) {
                                            if (err) {
                                                /**Se houver indisponibilidade no serviço retorna erro 442 com a mensagem de que o serviço está indisponível */
                                                res.status(442).json({ message: "Serviço indisponível" })
                                            } else {
                                                /**Caso contrário retorna sucesso 200 com a mensagem de que  a conta foi verificada com sucesso */
                                                res.status(200).json({ message: "Conta verificada com sucesso" })
                                                /**É feita a invalidação do token no banco de dados */
                                                ResetPassSchema.findByIdAndUpdate({ _id: idDefine }, { $set: { isValid: 0 } }, (err, result) => {
                                                    /**Se houver erro no processo é logado no console detalhadamente */
                                                    if (err) {
                                                        console.log(`Erro ao invalidar token de verificação de conta => ${err}`)
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                } else {
                    /**Se as senhas digitadas não forem iguais retorna erro 422 com a mensagem de que as senhas não conferem */
                    res.status(422).json({ message: 'As senhas digitadas não conferem' })
                }
            }
        }
    })
}

/**Função para resetar e definir a nova senha */
exports.resetAndDefineNewPass = function (req, res) {
    const token = req.params.token
    const newPassword = req.body.senha
    const confirmNewPassword = req.body.confirmaSenha

    /**Busca o token no banco de dados */
    ResetPassSchema.findOne({ token: token }, async (err, reset) => {
        /**Se houver algum erro retorna erro 500 com a mensagem de que houve um erro ao processar a requisição */
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição' })
        } else {
            /**Se o token não for válido retorna erro 422 com a mensagem de que não foi encontrado nenhum pedido de redefinição de senha */
            if (!reset.isValid) {
                res.status(422).json({ message: 'Não encontramos um pedido de redefinição de senha! Tente novamente' })
            } else {
                let idReset = reset._id
                let emailUser = reset.email
                /**Se as senhas conferirem ela é transformada em string */
                if (newPassword === confirmNewPassword) {
                    JSON.stringify(newPassword)
                    /**É gerado o SALT para encriptar a senha */
                    const salt = await bcrypt.genSaltSync(10)
                    /**A senha é encriptada */
                    hashPassword = await bcrypt.hash(newPassword, salt)
                    /**O usuário no banco de dados é atualizado com a nova senha */
                    UsuarioSchema.findOneAndUpdate({ email: emailUser }, { $set: { senha: hashPassword } }, (err, usuario) => {
                        if (err) {
                            /**Se houver algum erro retorna erro 500 com a mensagem de que houve um erro ao processar a requisição */
                            console.log(err)
                            res.status(500).json({ message: 'Houve um erro ao processar sua requisição' })
                        } else {
                            /**Se não retornar o usuário atualizado retorna erro 422 com a mensagem de que ocorreu um erro */
                            if (!usuario) {
                                res.status(422).json({ message: 'Ocorreu um erro' })
                            } else {
                                /**Caso contrário lê o HTML de que a redefinição foi um sucesso */
                                readHTMLFile(__dirname + '/templates/reset-success.html', function (err, html) {
                                    if (err) {
                                        res.status(500).json({ message: 'Houve um erro ao processar sua requisição! Tente novamente mais tarde' })
                                    }
                                    /**Compila o HTML usando handlebars */
                                    var template = handlebars.compile(html)
                                    /**Processa os dados que serão recolocados no template */
                                    var replacements = {
                                        name: usuario.nome
                                    }
                                    /**Adiciona os dados recolocados ao template */
                                    var htmlToSend = template(replacements)
                                    /**Define para qual e-mail será enviado, de qual e-mail será enviado, qual o corpo da mensagem e qual o assunto da mensagem */
                                    var mailOptions = {
                                        to: usuario.email,
                                        from: process.env.MESSENGER_MAIL,
                                        html: htmlToSend,
                                        subject: 'Redefinimos a sua senha | GPES Web'
                                    }
                                    /**Envia o email */
                                    smtpTransport.sendMail(mailOptions, function (err) {
                                        if (err) {
                                            /**Se houver indisponibilidade no serviço retorna erro 442 com a mensagem de que o serviço está indisponpivel */
                                            res.status(442).json({ message: 'Serviço Indisponível' })
                                        } else {
                                            /**Caso contrário retorna sucesso 200 com a mensagem de que a senha foi redefinida com sucesso */
                                            res.status(200).json({ message: 'Senha redefinida com sucesso' })
                                            /**Invalida o token no banco de dados */
                                            ResetPassSchema.findByIdAndUpdate({ _id: idReset }, { $set: { isValid: 0 } }, (err, result) => {
                                                /**Se houver erro na invalidação loga o erro detalhado no console */
                                                if (err) {
                                                    console.log(`Erro ao invalidar token de redefinição de senha => ${err}`)
                                                }
                                            })
                                        }
                                    })
                                })
                            }
                        }
                    })
                } else {
                    /**Caso as senhas digitadas não sejam iguais retorna erro 422 com a mensagem de que as senhas digitadas não conferem */
                    res.status(422).json({ message: 'As senhas digitadas não conferem' })
                }
            }
        }
    })
}