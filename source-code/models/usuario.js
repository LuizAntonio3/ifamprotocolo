var bookshelf = require('../config/database')
const _company = require('./company')
const _denuncia = require('./denuncia');

var usuario = bookshelf.Model.extend({
  tableName: 'usuario',
  company: function () {
    return this.belongsTo(_company)
  },
  denuncias: function () {
    return this.hasMany(_denuncia)
  }
})

module.exports = usuario;

