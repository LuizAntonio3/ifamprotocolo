var bookshelf = require('../config/database')

var usuario = bookshelf.Model.extend({
  tableName: 'usuario'
})

module.exports = usuario;

