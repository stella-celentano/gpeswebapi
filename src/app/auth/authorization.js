const jwt = require('jsonwebtoken')

/**Middleware de autorização da API */
const handleAuthorization = (req, res, next) => {
    const token = extractToken(req)

    /**Se não tiver token, define o header com o tipo do token necessário e retorna erro 401 com a mensagem de que é necessário se autenticar para prosseguir. */
    if (!token) {
        res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
        res.status(401).json({ message: "É necessário se autenticar!", authorization: true })
    } else {
        /**Se tiver token faz a verificação para validar o token, utilizando o segredo configurado nas variáveis de ambiente. */
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                /**Se houver algum erro na verificação a autenticação não é concluída e retorna erro 401 com a mensagem de que é necessário se autenticar novamente para prosseguir. */
                res.status(401).json({ message: "Usuário não autenticado. Faça o login novamente.", authorization: true })
            } else {
                /**Se o token for decodificado é autorizada a entrada da requisição na API */
                if (decoded) {
                    next()
                } else {
                    /**Se o token não for decodificado retorna erro 403 com a mensagem de que o token não foi autorizado. */
                    res.status(403).json({ message: "Não autorizado!", authorization: true })
                }
            }
        })
    }
}

/**Função utilizada para extrair o token de todas as requisições que passam pelo middleware. */
function extractToken(req) {
    let token

    /**Se a requisição contém headers e headers do tipo authorization faz a extração do token. */
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1]
        }
    }
    return token
}

module.exports = handleAuthorization