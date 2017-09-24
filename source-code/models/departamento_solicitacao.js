var bookshelf = require('../config/database')

var departamento_solicitacao = bookshelf.Model.extend({
  tableName: 'departamento_solicitacao'
})

module.exports = departamento_solicitacao;

