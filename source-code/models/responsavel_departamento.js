var bookshelf = require('../config/database')

var responsavel_departamento = bookshelf.Model.extend({
  tableName: 'responsavel_departamento'
})

module.exports = responsavel_departamento;

