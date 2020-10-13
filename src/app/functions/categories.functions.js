function defineFields(fields) {
  if (fields == 'form') {
    return { nome: 1 }
  } else if (fields == 'search') {
    return { nome: 1, descricao: 1 }
  }
}

module.exports = { defineFields }