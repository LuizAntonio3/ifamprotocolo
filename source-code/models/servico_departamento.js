var bookshelf = require('../config/database')

var servico_departamento = bookshelf.Model.extend({
  tableName: 'servico_departamento'
})

module.exports = servico_departamento;

