var bookshelf = require('../config/database')

var departamento = bookshelf.Model.extend({
  tableName: 'departamento'
})

module.exports = departamento;

