var bookshelf = require('../config/database')

var solicitacao = bookshelf.Model.extend({
  tableName: 'solicitacao'
})

module.exports = solicitacao;

