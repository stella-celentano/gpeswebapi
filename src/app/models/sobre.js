const { Schema, model } = require("mongoose")

const SobreSchema= new Schema({
    titulo:{
        type: String,
        required: true,
        trim: true
    },
    descricao:{
        type: String,
        required: true,
        trim: true
    },
    ordenacao:{
        type: Number,
        required: true,
        trim: true
    },
    principal:{
        type: String,
        required: true,
        trim: true
    }
},
{
    versionKey: false,
    timestamps: false,
}
)

module.exports = model('sobreSchema', SobreSchema)