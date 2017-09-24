var bookshelf = require('../config/database')

var disciplina = bookshelf.Model.extend({
  tableName: 'disciplina'
})

module.exports = disciplina;

