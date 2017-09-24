var bookshelf = require('../config/database')

var operador = bookshelf.Model.extend({
  tableName: 'operador'
})

module.exports = operador;

