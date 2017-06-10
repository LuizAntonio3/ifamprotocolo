var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ifamprotocolo'
  }
})


var database = require('bookshelf')(knex)

module.exports = database;
