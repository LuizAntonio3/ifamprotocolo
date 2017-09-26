exports.up = function(knex, Promise) {
  return knex.schema.createTable('operador', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.string('email').notNull();
        t.string('senha').notNull();
        

    }).then(function() {
      return knex('operador').insert([
        {
            nome: "robson",
            email: "robson.rojas@gmail.com",
            senha: "123",
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('operador');
};
