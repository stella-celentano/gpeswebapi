const { Schema, model } = require("mongoose")

const ResetarSenhaSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    token: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    isValid: {
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
module.exports = model('resetarSenhaSchema', ResetarSenhaSchema)