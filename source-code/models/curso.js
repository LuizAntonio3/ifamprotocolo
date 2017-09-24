var bookshelf = require('../config/database')

var curso = bookshelf.Model.extend({
  tableName: 'curso'
})

module.exports = curso;

