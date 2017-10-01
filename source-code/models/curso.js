var bookshelf = require('../config/database')

bookshelf.plugin('registry')

require('./disciplina');
var curso = bookshelf.Model.extend({
  tableName: 'curso',
  disciplinas: function() {
    return this.hasMany('disciplina', 'id_curso');
  }
});

module.exports = bookshelf.model('curso', curso);