# aceleralog

Aplicativo de registro de logs, à la [Sentry](https://sentry.io/welcome/). OK, um _pouco_ mais simples.

- API REST feita com Spring Boot
- Frontend feito com next.js (react/typescript)
- Exemplo em [aceleradev.herokuapp.com](https://aceleradev.herokuapp.com)

## Instalação backend

- Testado com openJDK 11
- Procedimento padrão de execução: executar a classe principal na sua IDE de preferência
- Execução via terminal:
  - `./mvnw install [-DskipTests]` - primeira instalação
  - `./mvnw spring-boot:run` - executar (porta 8080)
- Listagem das rotas em "/swagger-ui.html"

**Usuário inicial**

A primeira execução cria um usuário administrador com username=`adm` e senha=`123456`.

## Instalação frontend

- Executar `npm i` ou `yarn` dentro da pasta /frontend
- `npm run dev` ou `yarn dev` para exexutar o servidor de desenvolvimento (porta 3000)
