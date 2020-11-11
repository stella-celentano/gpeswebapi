const { Schema, model } = require('mongoose');

const InscricaoSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    telefone: {
        type: String,
        required: false,
        trim: true
    },
    cidade: {
        type: String,
        required: true,
        trim: true
    },
    ra: {
        type: String,
        required: true,
        trim: true
    },
    curso: {
        type: String,
        required: true,
        trim: true
    },
    periodo: {
        type: String,
        required: true,
        trim: true
    },
    semestre: {
        type: String,
        required: true,
        trim: true
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        versionKey: false,
        timestamps: false
    }
)

module.exports = model('inscricaoSchema', InscricaoSchema)