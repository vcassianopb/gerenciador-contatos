# Gerenciador de Contatos API

API RESTful desenvolvida em Node.js com Express e MySQL para gerenciamento de contatos.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL 8.0
- Docker
- dotenv

## Requisitos Prévios

- Node.js (v18 ou superior)
- Docker (ou uma instância local do MySQL)

## Configuração do Ambiente

1. Clone o repositório:
git clone https://github.com/vcassianopb/gerenciador-contatos.git
cd gerenciador-contatos

2. Instale as dependências:
npm install

3. Crie um arquivo .env na raiz do projeto baseado nas suas credenciais do banco de dados:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=gerenciador_contatos
DB_PORT=3306

## Banco de Dados

Suba o container do MySQL utilizando o Docker:

docker run --name mysql-teste -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=gerenciador_contatos -p 3306:3306 -d mysql:8.0

Execute o script de inicialização para criar as tabelas necessárias:

- No Linux / macOS:
docker exec -i mysql-teste mysql -uroot -proot gerenciador_contatos < init.sql

- No Windows (PowerShell):
Get-Content init.sql | docker exec -i mysql-teste mysql -uroot -proot gerenciador_contatos

## Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento com auto-reload:

npm run dev

A aplicação estará disponível em http://localhost:3000.

## Endpoints da API

### POST /contatos
Cria um novo contato.

- Body:
{
  "nome": "Victor Cassiano",
  "telefone": "84999998888"
}
- Regra de Validação: O campo nome deve possuir no mínimo duas palavras, com cada palavra contendo ao menos 3 letras.

---

### GET /contatos
Retorna a lista de todos os contatos cadastrados.

---

### PATCH /contatos/:id
Atualiza parcialmente os dados de um contato existente.

- Body (exemplo):
{
  "telefone": "84988887777"
}

---

### DELETE /contatos/:id
Remove um contato do banco de dados pelo seu ID.