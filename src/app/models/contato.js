const { Schema, model } = require("mongoose")

const ContatoSchema = new Schema({
    descricao: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 50,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    },
    endereco: {
        required: false,
        cep: {
            type: String,
            required: false,
            trim: true
        },
        rua: {
            type: String,
            required: false,
            minLength: 1,
            maxlength: 100,
            trim: true
        },
        numero: {
            type: String,
            required: false,
            maxlength: 4
        },
        bairro: {
            type: String,
            required: false,
            minLength: 1,
            maxlength: 50,
            trim: true
        },
        cidade: {
            type: String,
            required: false,
            minLength: 1,
            maxlength: 75,
            trim: true
        },
        estado: {
            type: String,
            required: false,
            maxlength: 2,
            trim: true
        },
        complemento: {
            type: String,
            required: false,
            maxlength: 75,
            trim: true
        }
    },
    telefone: {
        required: false,
        ddi: {
            type: String,
            required: false,
            maxlength: 4
        },
        prefixo: {
            type: String,
            required: false,
            maxlength: 2
        },
        numero: {
            type: String,
            required: false
        }
    },
    email: {
        type: String,
        required: false,
        minLength: 1,
        maxlength: 75,
        trim: true
    },
    redesocial: {
        required: false,
        tipo: {
            type: String,
            required: false,
            trim: true
        },
        link: {
            type: String,
            required: false,
            minLength: 1,
            maxlength: 100,
            trim: true
        }
    },
    status: {
        type: Boolean,
        trim: true,
        maxlength: 1,
        default: 1
    }


},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model('contatoSchema', ContatoSchema)
