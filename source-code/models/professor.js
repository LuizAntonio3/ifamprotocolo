var bookshelf = require('../config/database')

var professor = bookshelf.Model.extend({
  tableName: 'professor'
})

module.exports = professor;

