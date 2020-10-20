const { Schema, model } = require("mongoose")

const PublicacoesSchema = new Schema({
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
  categoria: {
    type: String,
    required: true,
    trim: true
  },
  autores: {
    type: String,
    required: true,
    trim: true
  },
  plataforma: {
    type: String,
    required: true,
    trim: true
  },
  cidade: {
    type: String,
    required: true,
    trim: true
  },
  dataPublicacao: {
    type: Date,
    required: true
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('publicacoesSchema', PublicacoesSchema)