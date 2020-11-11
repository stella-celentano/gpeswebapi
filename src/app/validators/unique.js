const ContatoSchema = require('./../models/contato');
const UsuarioSchema = require('./../models/usuario');
const ProcessoSeletivoSchema = require('./../models/processo_seletivo');
const integrantesSchema = require('./../models/integrantes');
const CategoriaSchema = require('./../models/categories');
const PublicacoesSchema = require('./../models/publicacoes');
const EventoSchema = require('./../models/eventos');
const SobreSchema = require('./../models/sobre');
const AutoresSchema = require('./../models/autores');
const InscricaoSchema = require('./../models/inscricao');


class UniqueValidators {

    /**Função para validar se o título do Sobre que está sendo criado é único. */
    uniqueSobreTitulo(req, res) {
        const titulo = req.query.title.replace(/%20/g, " ")

        SobreSchema.find({ titulo: { '$regex': `^${titulo}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Título disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o nome do Contato que está sendo criado é único. */
    uniqueContatoNome(req, res) {
        const nome = req.query.name.replace(/%20/g, " ")

        ContatoSchema.find({ descricao: { '$regex': `^${nome}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Título disponível.", result: result.length })
                }
            }
        })
    }

    uniqueIntegranteNome(req, res) {
        const nome = req.query.nome.replace(/%20/g, " ")

        integrantesSchema.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um integrante com esse nome.", result: result.length })
                } else {
                    res.status(200).json({ message: "Nome disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o nome do Usuário que está sendo criado é único. */
    uniqueUsuarioNome(req, res) {
        const nome = req.query.name.replace(/%20/g, " ")

        UsuarioSchema.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Título disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o usuário do Usuário que está sendo criado é único. */
    UniqueUsuarioUsuario(req, res) {
        const usuario = req.query.username.replace(/%20/g, " ")

        UsuarioSchema.find({ usuario: { '$regex': `^${usuario}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Título disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o e-mail do Usuário que está sendo criado é único. */
    UniqueUsuarioEmail(req, res) {
        const email = req.query.email.replace(/%20/g, " ")

        UsuarioSchema.find({ email: { '$regex': `^${email}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Título disponível.", result: result.length })
                }
            }
        })
    }
    //** Função para validar se o título do Evento que está sendo criado é único. */
    uniqueEventoTitulo(req, res) {
        const titulo = req.query.title.replace(/%20/g, " ")

        EventoSchema.find({ titulo: { '$regex': `^${titulo}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um evento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Título disponível.", result: result.length })
                }
            }
        })
    }


    /**Função para validar se o título do Processo Seletivo que está sendo criado é único. */
    uniqueProcessoSeletivoTitulo(req, res) {
        const titulo = req.query.title.replace(/%20/g, " ")

        ProcessoSeletivoSchema.find({ titulo: { '$regex': `^${titulo}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Título disponível.", result: result.length })
                }
            }
        })
    }


    /**Função para validar se o título da Publicação que está sendo criado é único. */
    uniquePublicacaoTitulo(req, res) {
        const titulo = req.query.title.replace(/%20/g, " ")

        PublicacoesSchema.find({ titulo: { '$regex': `^${titulo}$`, '$options': 'i' } }, function (err, result) {

            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Título disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o nome da categoria que está sendo criado é único. */
    uniqueCategoriaNome(req, res) {
        const nome = req.query.name.replace(/%20/g, " ")

        CategoriaSchema.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Categoria disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o nome do autor que está sendo criado é único. */
    uniqueAutorNome(req, res) {
        const nome = req.query.name.replace(/%20/g, " ")

        AutoresSchema.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Autor disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o nome da inscrição que está sendo criada é único. */
    uniqueInscricaoNome(req, res) {
        const nome = req.query.name.replace(/%20/g, " ")

        InscricaoSchema.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse título.", result: result.length })
                } else {
                    res.status(200).json({ message: "Nome disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o email da inscrição que está sendo criada é único. */
    uniqueInscricaoEmail(req, res) {
        const email = req.query.email.replace(/%20/g, " ")

        InscricaoSchema.find({ email: { '$regex': `^${email}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse email.", result: result.length })
                } else {
                    res.status(200).json({ message: "Email disponível.", result: result.length })
                }
            }
        })
    }

    /**Função para validar se o ra da inscrição que está sendo criada é único. */
    uniqueInscricaoRa(req, res) {
        const ra = req.query.ra.replace(/%20/g, " ")

        InscricaoSchema.find({ ra: { '$regex': `^${ra}$`, '$options': 'i' } }, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição.", error: err })
            } else {
                if (result.length > 0) {
                    res.status(200).json({ message: "Já existe um documento com esse RA.", result: result.length })
                } else {
                    res.status(200).json({ message: "RA disponível.", result: result.length })
                }
            }
        })
    }





}

module.exports = new UniqueValidators()