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
* **Publicações:** Padronização de mensagens de sucesso e erro de requisições feita e foi adicionado ao modelo de dados os campos autores, plataforma, cidade e dataPublicacao.
* **Categorias:** Padronização de mensagens de sucesso e erro de requisições feita.
* **Eventos:** Padronizando as mensagens de sucesso e erro de requisições feita, corrigindo o método getWithParams e implementando o método getByTitle.
* **Integrantes:** Adição do campo lattes nos integrantes correções no metodo getWithParams.
* **Sobre:** Padronizando as mensagens de sucesso e erro de requisições feita.
* **Processo Seletivo:** Implementando método que atualizar o valor do campo ordenação e alteração no arquivo de rotas privadas para inserir a chamada ao método.
