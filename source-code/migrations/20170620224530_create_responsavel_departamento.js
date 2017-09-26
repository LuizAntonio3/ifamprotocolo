exports.up = function(knex, Promise) {
  return knex.schema.createTable('responsavel_departamento', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.string('email').notNull();
        t.string('senha').notNull();

        t.integer('id_departamento').unsigned().notNull().references('departamento.id');;

    }).then(function() {
      return knex('responsavel_departamento').insert([
        {
            nome: "robson",
            email: "robson.rojas@gmail.com",
            senha: "123",
            id_departamento: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('responsavel_departamento');
};
