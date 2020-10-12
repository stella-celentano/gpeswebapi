const { Schema, model } = require("mongoose")

const ProcessoSeletivoSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    descricao: {
        type: String,
        required: true
    },
    ordenacao: {
        type: Number,
        required: false
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
        timestamps: false
    }
)

module.exports = model('processoSeletivoSchema', ProcessoSeletivoSchema)