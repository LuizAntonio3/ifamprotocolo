var bookshelf = require('../config/database')

var departamento_solicitacao = require('./departamento_solicitacao')
var servico_solicitacao = require('./servico_solicitacao')
var anexo = require('./anexo')

var solicitacao = bookshelf.Model.extend({
  tableName: 'solicitacao',
  departamentos_solicitacao: function () {
    return this.belongsToMany(departamento_solicitacao);
  },
  servicos_solicitacao: function () {
    return this.belongsToMany(servico_solicitacao);
  },
  anexos: function () {
    return this.belongsToMany(anexo);
  }
  
})

module.exports = solicitacao;

