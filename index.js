const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.APP_PORT || 3000
const database = require('./src/config/database')
const PublicRoutes = require('./src/app/routes/public/public.routes')
const PrivateRoutes = require('./src/app/routes/private/private.routes')
const handleAuthentication = require('./src/app/auth/authentication')
const handleAuthorization = require('./src/app/auth/authorization')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/', (req, res) => {
    res.send({ message: `API backend node.js para o projeto do site do GPES ouvindo na porta ${PORT}` })
})

/**Rota que redireciona para handleAuthentication, onde ocorrem as validações para autenticação. */
app.post('/login', handleAuthentication)

/**Redirecionamento para as rotas públicas da API */
app.use('/public', PublicRoutes)

/**Redirecionamento para as rotas privadas da API. Essas passam pelo middleware handleAuthorization onde o token de autorização enviado na request é validado. */
app.use('/authenticated', /*handleAuthorization,*/ PrivateRoutes)

app.use('*', (req, res) => { res.send({ message: 'API não encontrada' }) })

app.listen(PORT, () => {
    console.log(`API ouvindo na porta ${PORT}`)
})

module.exports = app