exports.up = function(knex, Promise) {
  return knex.schema.createTable('turma', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();

        t.integer('id_curso').unsigned().notNull().references('curso.id');;
    }).then(function() {
      return knex('turma').insert([
        {
            nome: "Introdução á computação",
            id_curso: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('turma');
};
