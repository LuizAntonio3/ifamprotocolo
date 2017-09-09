var bookshelf = require('../config/database')

var solicitacao = require('./solicitacao')
var solicitacao = require('./solicitacao')

var departamento_solicitacao = bookshelf.Model.extend({
  tableName: 'departamento_solicitacao',
  solicitacao: function () {
    return this.hasOne(solicitacao)
  },
  departamento: function () {
    return this.hasOne(departamento)
  }
})

module.exports = departamento_solicitacao;

