var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host: 'ec2-184-72-246-219.compute-1.amazonaws.com',
    user: 'sslvislnyikbdn',
    password: '003ed630f73700e8d8be5f85cd8471eb3077301edba34ea63f6ad593cd865a7a',
    database: 'd7t8e1cmrvf86j',
    ssl: true
  }
  // connection: {
  //   host: 'localhost',
  //   user: 'postgres',
  //   password: '',
  //   database: 'airu'
  // }
})


var database = require('bookshelf')(knex)

module.exports = database;
