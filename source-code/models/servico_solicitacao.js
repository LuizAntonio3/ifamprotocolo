var bookshelf = require('../config/database')

var servico_solicitacao = bookshelf.Model.extend({
  tableName: 'servico_solicitacao'
})

module.exports = servico_solicitacao;

