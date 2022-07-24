# Desafio do Processo Seletivo da XP

Esta é uma API RESTful de simulação de operações bancárias com autenticação JWT.

## Sumário

- [Visão geral](#visão-geral)
  - [O desafio](#o-desafio)
  - [Imagens](#imagens)
  - [Links](#links)
- [Meu processo](#meu-processo)
  - [Construído com](#construído-com)
  - [Recursos úteis](#recursos-úteis)
- [Executando localmente](#executando-localmente)
  - [Com Docker](#com-docker)
  - [Sem Docker](#sem-docker)
- [Autora](#autora)

## Visão geral

### O desafio

O desafio foi a construção de uma API com operações de CRUD com autenticação do Cliente.

**Os clientes devem ser capaz de?**

- Registrar-se e Autenticar-se
- Fazer Depósitos e Retiras da conta Bancária.
- Fazer Compra e Venda de Ativos.
- Buscar Ativos da Corretora.
- Buscar Ativos da Carteira de Investimentos da Conta.
- Buscar o saldo da Conta Bancária.
- Verificar o Extrato Bancário por período desejado.
- Verificar o Relatório de Investimentos por período desejado.

### Imagem do Banco de Dados

<small>Banco de Dados</small>
![](./investimentosXP.png)

### Link da Documentação da API

- URL da aplicação: https://invest-xp.herokuapp.com/api-docs/

## Meu processo

### Construído com

- TypeScript
- Node.js
- Express.js
- JWT
- Prisma
- MySQL
- Mocha, Chai and Supertest

### Recursos úteis

- [Prisma Documentação](https://www.prisma.io/)

## Executando localmente

### Com Docker

Clona o repositório

```bash
git clone git@github.com:lorenepecci/DesafioXP.git
```

Entra no repositório

```bash
cd DesafioXP
```

Instala as dependências

```bash
npm install
```

Sobe os containers

```bash
docker-compose up -d
```

### Sem Docker

**É necessário ter o Node.js e o MySQL instalado localmente!**

Clona o repositório

```bash
git clone git@github.com:lorenepecci/DesafioXP.git
```

Entra no repositório

```bash
cd DesafioXP
```

Instala as dependências

```bash
npm install
```

Crie um arquivo .env e configure as variáveis de ambiente (Veja o arquivo: '.env.example') 


Executa o projeto manualmente

```bash
npm run dev
```

## Autora

- LinkedIn - [Lorene Pecci](https://www.linkedin.com/in/lorene-pecci/)
