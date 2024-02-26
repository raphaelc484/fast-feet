# Fast-Feet app

Construção de modelo de site de sistema de entregas

## 🚀 Sobre o projeto

Este projeto é conduzido com base nos princípios da Clean Architecture, enfocando 
uma abordagem estruturada e independente de frameworks específicos. Dividi o 
trabalho em duas frentes distintas, a fim de aprofundar o estudo das camadas 
fundamentais da arquitetura.

Na primeira etapa, foco na análise da camada de domínio, que engloba 
as entidades e os casos de uso essenciais ao sistema. Nossa prioridade foi aplicar 
os princípios do SOLID para garantir um código limpo e de fácil manutenção. Além 
disso, buscamos integrar as práticas do Domain-Driven Design (DDD) de forma otimizada, 
enquanto os casos de uso foram desenvolvidos utilizando a metodologia do Test-Driven 
Development (TDD).

Essa abordagem meticulosa visa não apenas criar uma base sólida para o desenvolvimento, 
mas também garantir que o sistema seja flexível, adaptável e resiliente às mudanças. 
Estou comprometido em seguir os mais altos padrões de qualidade e eficiência durante 
todo o processo de desenvolvimento

### 📋 Pré-requisitos

Quais são os requisitos para executar a aplicação?

```
NodeJS V18
```

### 🔧 Instalação

Instale todas as dependências utilizando NPM ou semelhantes. 

Use o comando abaixo para o caso NPM:

```
npm install
```

### 🔩 Teste unitários

Aqui são testados os casos de uso que são a base de nossa aplicação. Existem várias 
maneiras de executar esses testes, a primeira que pode ser usada é:

```
npm run test
```

Caso queira mantes os testes sempre em operação use:

```
npm run test:watch
```
## RFs (Requisitos funcionais)

- [x]  A aplicação deve ter dois tipos de usuário, entregador e/ou admin
- [x]  Deve ser possível realizar o CRUD dos entregadores
- [x]  Deve ser possível realizar o CRUD das encomendas
- [x]  Deve ser possível realizar o CRUD dos destinatários
- [x]  Deve ser possível realizar login com CPF e Senha
- [x]  Deve ser possível alterar a senha de um usuário
- [x]  Deve ser possível escolher um entregador - new
- [x]  Deve ser possível listar os entregadores - new + Pagination
- [x]  Deve ser possível listar as entregas de um usuário
- [x]  Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
- [x]  Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
- [x]  Deve ser possível retirar uma encomenda
- [x]  Deve ser possível marcar uma encomenda como devolvida
- [x]  Deve ser possível marcar uma encomenda como entregue
- [x]  Deve ser possível notificar o destinatário a cada alteração no status da encomenda

## RNs (Regras de negócio) - Implementações futuras

- [ ]  Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
- [ ]  Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
- [ ]  Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
- [ ]  Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
- [ ]  Somente o entregador que retirou a encomenda pode marcar ela como entregue
- [ ]  Somente o admin pode alterar a senha de um usuário
- [ ]  Não deve ser possível um entregador listar as encomendas de outro entregador

## 🛠️ Construído com

Ferramentas utilizadas

* [NodeJS](https://nodejs.org/) 
* [Typescript](https://www.typescriptlang.org/)
* [Vitest](https://vitest.dev/)

## ✒️ Autores

* [Raphael Clemente Miranda](https://www.linkedin.com/in/raphaec484/)