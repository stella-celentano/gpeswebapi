const { Schema, model } = require("mongoose")

const IntegrantesSchema = new Schema({

    nome: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    
    email: {
        type: String,
        required: false,
        trim: true
    },

    contato: {
        type: String,
        required: false,
        trim: true
    },

    lattes: {
        type: String,
        required: false,
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
        required: false,
        default: null
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
