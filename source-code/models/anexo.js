var bookshelf = require('../config/database')

var anexo = bookshelf.Model.extend({
  tableName: 'anexo'
})

module.exports = anexo;

