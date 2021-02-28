const { Schema, model } = require('mongoose');

const SelecaoSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    dataInicio: {
        type: Date,
        required: true
    },
    dataFim: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    inscritos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'inscricaoSchema'
        }
    ]
},
    {
        versionKey: false,
        timestamps: false
    }
)

module.exports = model('selecaoSchema', SelecaoSchema)