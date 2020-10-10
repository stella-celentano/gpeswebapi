const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsuarioSchema = require('./../models/usuario')

/**Middleware de autenticação da API */
const handleAuthentication = (req, res) => {
    const email = req.body.email
    const senha = req.body.senha
    let id = null

    /**Busca o usuário no banco de dados utilizando o e-mail */
    UsuarioSchema.findOne({ email: email }, (err, usuario) => {
        /**Se não conseguir completar a busca por um erro, retorna erro 500 com a mensagem de que houve um erro ao processar a requisição */
        if (err) {
            res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
        } else {
            /**Se não for encontrado nenhum usuário com as condições especificadas, retorna erro 403 com a mensagem de que os dados estão inválidos */
            if (!usuario) {
                res.status(403).json({ message: 'Usuário não encontrado! Tente novamente!', authorization: false })
            } else {
                id = usuario._id
            }
            /**Função para comparar a senha do usuário salva no banco de dados e a senha informada no login */
            bcrypt.compare(senha, usuario.senha, function (err, result) {
                /**Se as senhas conferirem é gerado um token com o ID do usuário e o segredo salvo nas variáveis de ambiente. O token tem duração de 7200 segundos. Retorna sucesso 200 e no corpo da resposta são enviados => id do usuário autenticado, nome do usuário autenticado, usuário do usuário autenticado, email do usuário autenticado, permissão de acesso do usuário autenticado e o token. */
                if (result) {
                    const token = jwt.sign({ id }, process.env.AUTH_SECRET, {
                        expiresIn: 7200
                    })
                    res.status(200).json(
                        {
                            auth: true,
                            message: "Dados autenticados com sucesso",
                            usuario: {
                                _id: usuario._id,
                                nome: usuario.nome,
                                user: usuario.user,
                                email: usuario.email,
                                role: usuario.role
                            },
                            token: token
                        }
                    )
                } else {
                    /**Se as senhas não conferirem retorna erro 401 com a mensagem de que não foi autenticado, e os dados informados devem ser verificados */
                    res.status(401).json({ message: "Seu e-mail ou senha estão inválidos! Tente novamente!", authorization: false })
                }
            })
        }
    })
}

module.exports = handleAuthentication