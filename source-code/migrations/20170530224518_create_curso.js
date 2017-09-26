exports.up = function(knex, Promise) {
  return knex.schema.createTable('curso', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.string('tipo').notNull();
        t.string('ano_letivo').notNull();

    }).then(function() {
      return knex('curso').insert([
        {
            nome: "Técnico Eletrônica",
            tipo: "Superior",
            ano_letivo: "2017"
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('curso');
};
