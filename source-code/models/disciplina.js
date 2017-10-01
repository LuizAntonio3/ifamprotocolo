var bookshelf = require('../config/database')

bookshelf.plugin('registry')

require('./curso');
var disciplina = bookshelf.Model.extend({
  tableName: 'disciplina',
  curso: function() {
    return this.belongsTo('curso', 'id_curso', 'id');
  }
});

module.exports = bookshelf.model('disciplina', disciplina);