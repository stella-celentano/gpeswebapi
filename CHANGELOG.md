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
* **Eventos:** Implementando o método de update e disponibilizando a rota atualizar.
* **Integrantes:** Adição da rota e metodo para excluir integrante.
* **Sobre:** Implementando o método de update e disponibilizando a rota atualizar.
* **Sobre:** Implementando metodo de ordenação do Sobre.
* **Autores:** Implementado o modelo de dados, controller com os métodos getWithParams e create, rotas listar e criar e validador de nome único com a rota do validador.
* **Publicações:** Implementado o método update e getPublicacoesByTitleWithoutFiles no controller e disponibilizado as rotas getdata e atualizar e modificado o campo autores.
* **Autores:** Alterado o método getWithParams.

### Versão 1.4
* **Integrantes:** alterações dos metodos editar, criar, listar e deletar.
* **Projetos:** criação das rotas privadas de projetos, criação dos metodos adicionar, editar e excluir.
* **Sobre:** Implementando metodo delete e disponibilizando a rota.
* **Sobre:** Implementando metodo update para o principal e disponibilizando a rota.
* **Publicações:** Implementando o método delete e disponibilizando a rota privada apagar
* **Eventos:** Implementando o método de delete e disponibilizando a rota apagar.
* **Processo Seletivo - Inscrição:** Implementado controller, model, validação e rotas para Inscrição, desenvolvido método create e disponibilizada rota de acesso.

### Versão 1.5
* **Projetos:** Implementação das rotas e metodo editar e getByTitulo.
* **Processo Seletivo - Inscrição:** Implementado envio de email assim que a inscrição é realizada. Alteração do método create inscrição para suportar o relacionamento 1:N com seleção. Implementação dos métodos e disponibilização das rotas privadas para: criar uma seleção, buscar todas seleções existentes, buscas os detalhes de uma seleção, editar uma seleção e apagar uma seleção e método que busca os detalhes de um inscrito.

### Versão 1.6
* **Docker:** Adicionando scripts para criação do ambiente Docker da API.
* **Email:** Corrigindo a palavra Software no template dos emails.
* **Projetos:** Refatoração do metodo editar.
* **Integrantes:** Refatoração dos metodos ex-integrantes e atuais-integrantes para trazer o titulo do projeto.
* **Processo Seletivo - Inscrição:** Implementando método que busca a seleção que está aberta, validando se o status é verdadeiro e se as dastas estão dentro do limite correto comparando com a data atual em que a requisição estiver sendo feita.

### Versão 1.7
* **Processo Seletivo - Inscrição:** Removida a verificação do campo dataInicio no corpo da requisição do método de update e inserido o campo período no populate da busca de uma seleção pelo título.

### Versão 1.8
* **Projetos:** Criação das rotas publicas de projeto e dos metodos de getProjetoConcluido e getProjetoAtuais.
* **Processo Seletivo - Inscrição:** Implementando verificação de título único para uma seleção.