var bookshelf = require('../config/database')

var servico = bookshelf.Model.extend({
  tableName: 'servico'
})

module.exports = servico;

