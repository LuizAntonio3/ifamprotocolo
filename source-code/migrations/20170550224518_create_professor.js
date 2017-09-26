exports.up = function(knex, Promise) {
  return knex.schema.createTable('professor', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.string('email').notNull();
        t.string('senha').notNull();
        t.integer('id_disciplina').unsigned().notNull().references('disciplina.id');
        t.integer('id_turma').unsigned().notNull().references('turma.id');

    }).then(function() {
      return knex('professor').insert([
        {
            nome: "Micila",
            email: "robson.rojas@gmail.com",
            senha: "123",
            id_disciplina: 1,
            id_turma: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('professor');
};
