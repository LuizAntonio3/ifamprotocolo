var bookshelf = require('../config/database')

var turma = bookshelf.Model.extend({
  tableName: 'turma'
})

module.exports = turma;

