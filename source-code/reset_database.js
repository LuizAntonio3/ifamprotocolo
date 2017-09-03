var conn = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  charset  : 'utf8'
};

// connect without database selected
var knex = require('knex')({ client: 'mysql', connection: conn});

knex.raw('DROP DATABASE IF EXISTS ifamprotocolo;')
  .then(function(){

        knex.raw('CREATE DATABASE ifamprotocolo;')
        .then(function(){
            knex.destroy();

            console.log("Banco de dados ifamprotocolo criado");
            
            // connect with database selected
            // conn.database = 'ifamprotocolo';
            // knex = require('knex')({ client: 'mysql', connection: conn});

            // knex.schema.createTable('my_table', function (table) {
            //   table.string('my_field');
            // })
            // .then(function() {
            //   knex.destroy();
            // });
        })  
        .catch(function(error) {
            console.log(error);
            });
  })  
  .catch(function(error) {
      console.log(error);
    });