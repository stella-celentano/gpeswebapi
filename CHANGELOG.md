# GPES API

Log de alterações da aplicação

### Versão 1.0
* **Contatos:** Implementado CRUD completo e separado em rotas públicas e privadas.
* **Processo Seletivo:** Criado modelo, controller com os métodos de listar todos e criar, validador de título único, criação do arquivo de rotas para o módulo e alteração no arquivo de rotas privadas para inserir a rota de Processo Seletivo.
* **Integrantes:** Implementando create e getall nas rotas privadas.
* **Publicações:** Implementado o método Create e getWithParams para listar todos, validador de título único.
* **Categorias:** Reaproveitando a implementação de categories da AsiloWebAPI para implementar os métodos de criar e listar as categorias, validador de nome único.
* **Eventos:** Desenvolvido o método Create e GetWithParams.
* **Sobre:** Desenvolvido o metodo create no módulo sobre.

### Versão 1.1
* **Processo Seletivo:** Implementado método de busca por título e alteração no arquivo de rotas privadas para inserir a chamada ao método.
* **Publicações:** Padronização de mensagens de sucesso e erro de requisições feita e foi adicionado ao modelo de dados os campos autores, plataforma, cidade e dataPublicacao, implementado o método de busca por título, alterado parâmetro em getWithParamns e alterações no arquivo de rotas privadas para inserir a chamada do método.
* **Categorias:** Padronização de mensagens de sucesso e erro de requisições feita.
* **Eventos:** Padronizando as mensagens de sucesso e erro de requisições feita, corrigindo o método getWithParams e implementando o método getByTitle.
* **Integrantes:** Adição do campo lattes nos integrantes correções no metodo getWithParams.
* **Sobre:** Padronizando as mensagens de sucesso e erro de requisições feita, Implementado método de busca por título e alteração no arquivo de rotas privadas para inserir a chamada ao método.
* **Processo Seletivo:** Implementando método que atualizar o valor do campo ordenação e alteração no arquivo de rotas privadas para inserir a chamada ao método.
* **Integrantes:** Adição do metodo getIntegranteByName.
* **Sobre:** Implementado método de busca por título e alteração no arquivo de rotas privadas para inserir a chamada ao método.

### Versão 1.2
* **Processo Seletivo:** Implementado método que atualiza um registro e alteração no arquivo de rotas privadas para inserir a chamada ao método.
* **Processo Seletivo:** Implementado método que apaga um registro e alteração no arquivo de rotas privadas para inserir a chamada ao método.
* **Processo Seletivo:** Implementado rota pública para listagem dos registros.
* **Integrantes:** criação dos metodos getExIntegrantes e getAtuaisIntegrantes na controller, criação das rotas publicas de integrantes.
* **Sobre:** Implementado rota pública para listagem dos registros de sobre.
* **Publicações:** Refatorando o método getWithParams do controller para buscar por um período de tempo e para retornar o status corretamente quando não houver dados da busca.
* **Publicações:** Implementando rota pública para listagem dos registros.
* **Eventos:** Implementando a rota pública para listar todos.
* **Eventos:** Implementando e disponibilizando a rota pública para listar um registro de eventos.
* **Eventos:** Alterando o valor de limit no método getWithParams.

### Versão 1.3
* **Integrantes:** Alterando a model de integrante para aceitar email.
* **Integrantes:** Adição da rota e metodo para editar integrante.