const { Schema, model } = require("mongoose")

const AutoresSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  }
},
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = model('autoresSchema', AutoresSchema)