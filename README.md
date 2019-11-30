# aceleralog

Aplicativo de registro de logs, à la [Sentry](https://sentry.io/welcome/). OK, um _pouco_ mais simples.

- API REST feita com Spring Boot
- Frontend feito com next.js (react/typescript)
- Frontend em [aceleralog.now.sh](https://aceleralog.now.sh)
- Backend/swagger em https://aceleralog-api.herokuapp.com/swagger-ui.html

## Instalação backend

- Testado com openJDK 11
- Procedimento padrão de execução: executar a classe principal na sua IDE de preferência
- Execução via terminal:
  - `./mvnw install [-DskipTests]` - primeira instalação
  - `./mvnw spring-boot:run` - executar (porta 8080)
- Executar o `docker-compose.yml` presente na pasta pra subir um container de postgres (`docker-compose up`), ou configurar localmente o postgres9.5+ se forma análoga ao que se tem no compose.
- Listagem das rotas em "/swagger-ui.html"

**Usuário inicial**

A primeira execução cria um usuário administrador com username=`adm` e senha=`123456`.

**Padrão de código**

- Tabs com 2 espaços
- Formatação com format on save + prettier + prettier-plugin-java (não obrigatório porque ainda é complicado configurar em alguns editores)

## Enviando logs

  - Utilizar a rota `/collectors/submit-log` conforme consta no swagger. Esta rota é pública. Obter o API Token dos clientes na tela de configuração, acessível no canto superior direito da tela.

## Instalação frontend

- Executar `npm i` ou `yarn` dentro da pasta /frontend
- `npm run dev` ou `yarn dev` para exexutar o servidor de desenvolvimento (porta 3000)
