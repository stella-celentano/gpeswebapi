const express = require('express');
const route = express.Router();
const UniqueValidators = require('../../../validators/unique');

route.get('/unique/home/titulo', UniqueValidators.uniqueHomeTitulo);
route.get('/unique/usuario/nome', UniqueValidators.uniqueUsuarioNome);
route.get('/unique/usuario/usuario', UniqueValidators.UniqueUsuarioUsuario);
route.get('/unique/usuario/email', UniqueValidators.UniqueUsuarioEmail);
route.get('/unique/contato/nome', UniqueValidators.uniqueContatoNome);
route.get('/unique/integrantes/nome', UniqueValidators.uniqueIntegranteNome);
route.get('/unique/processo-seletivo/titulo', UniqueValidators.uniqueProcessoSeletivoTitulo);
route.get('/unique/categoria/nome', UniqueValidators.uniqueCategoriaNome);
route.get('/unique/publicacoes/titulo', UniqueValidators.uniquePublicacaoTitulo);
route.get('/unique/usuario/nome', UniqueValidators.uniqueUsuarioNome);
route.get('/unique/usuario/usuario', UniqueValidators.UniqueUsuarioUsuario);
route.get('/unique/usuario/email', UniqueValidators.UniqueUsuarioEmail);
route.get('/unique/contato/nome', UniqueValidators.uniqueContatoNome);
route.get('/unique/evento/titulo', UniqueValidators.uniqueEventoTitulo);
route.get('/unique/sobre/titulo', UniqueValidators.uniqueSobreTitulo);
route.get('/unique/autores/nome', UniqueValidators.uniqueAutorNome);
route.get('/unique/projetos/titulo', UniqueValidators.uniqueProjetoTitulo);
route.get('/unique/selecao/titulo', UniqueValidators.uniqueSelecaoTitulo);

module.exports = route
