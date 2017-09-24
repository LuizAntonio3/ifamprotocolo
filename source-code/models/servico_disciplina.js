var bookshelf = require('../config/database')

var servico_disciplina = bookshelf.Model.extend({
  tableName: 'servico_disciplina'
})

module.exports = servico_disciplina;

