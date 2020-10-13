const { Schema, model } = require("mongoose")

const CategoriesSchema = new Schema({
  nome: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    maxlength: 250,
    trim: true
  }
},
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = model('categoriesSchema', CategoriesSchema)