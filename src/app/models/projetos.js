const { Schema, model } = require("mongoose")

const ProjetosSchema = new Schema({

    titulo: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    
    descricao: {
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

    integrantes: [{
        type: Schema.Types.ObjectId,
        ref: 'integrantesSchema',
        required: false
    }]

},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model('projetosSchema', ProjetosSchema)
