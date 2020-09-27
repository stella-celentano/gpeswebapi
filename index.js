const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const database = require('./src/config/database')

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

app.use('*', (req, res) => { res.send({ message: 'API não encontrada' }) })

app.listen(PORT, () => {
    console.log(`API ouvindo na porta ${PORT}`)
})

module.exports = app