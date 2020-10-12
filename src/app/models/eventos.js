const { Schema, model } = require("mongoose")

const EventoSchema = new Schema({
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
  data: {
    type: Date,
    required: true
  }
},
  {
    versionKey: false,
    timestamps: false
  }
)

module.exports = model('eventoSchema', EventoSchema)