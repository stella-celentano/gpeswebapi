const { Schema, model } = require("mongoose")

const IntegrantesSchema = new Schema({

    nome: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    
    contato: {
        type: String,
        required: true,
        trim: true
    },

    situacao: {
        type: Boolean,
        required: true,
        trim: true
    },

    dataInicio: {
        type: Date,
        required: true
    },

    dataFim: {
        type: Date,
        required: false
    },

    projetos: {
        type: String,
        required: false
    }

},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model('integrantesSchema', IntegrantesSchema)
