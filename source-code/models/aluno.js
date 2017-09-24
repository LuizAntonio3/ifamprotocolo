var bookshelf = require('../config/database')

var aluno = bookshelf.Model.extend({
  tableName: 'aluno'
})

module.exports = aluno;

