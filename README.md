# ifamprotocolo
  Projeto sistema de gerenciamento de protocolo para o IFAM como parte de um curso de capacitação.


# Setup

### Criar o banco de dados
Criar um banco de dados no mysql "ifamprotocolo";

Conexão Mysql: usuario: root, senha: "", host: localhost

Entre na pasta source-code

Execute
npm install -g knex
knex migrate:latest


### Apagar o banco de dados
Entre na pasta source-code
Execute
knex migrate:rollback

Remova o banco de dados "ifamprotocolo"

### Execução
Na pasta source-code execute:

npm install

npm start

### Teste
Instalar o Advanced REST client ou PostMan

Executar uma requisição para http://localhost:3000/api/v1/usuario

Acessar:

http://localhost:3000
