var bookshelf = require('../config/database')

var alocacao_professor = bookshelf.Model.extend({
  tableName: 'alocacao_professor'
})

module.exports = alocacao_professor;

