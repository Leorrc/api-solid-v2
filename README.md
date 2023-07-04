# App

Gengar Control API.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível registrar uma transação, com as seguintes informações: "title, amount, category, type";
- [ ] Deve ser possível editar uma transação, podendo alterar todos os dados acima;
- [ ] Deve ser possível apagar uma transação;
- [ ] Deve ser possível listar todas as transação de um usuário;
- [ ] Deve ser possível visualizar uma única transação;
- [ ] Deve ser possível filtrar as transação de um usuário por: "withdraw" ou "desposit";
- [ ] O usuário só pode visualizar, editar e apagar as transações o qual ele criou;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode criar uma transação faltando os campos: "title, amount, category, type";

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de transações precisam estar paginadas com 5 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
