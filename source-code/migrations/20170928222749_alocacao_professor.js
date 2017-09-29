exports.up = function(knex, Promise) {
  return knex.schema.createTable('alocacao_professor', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.string('email').notNull();
        t.string('senha').notNull();

        t.integer('id_professor').unsigned().notNull().references('professor.id');;
        t.integer('id_disciplina').unsigned().notNull().references('disciplina.id');;
        t.integer('id_turma').unsigned().notNull().references('turma.id');;

    }).then(function() {
      return knex('alocacao_professor').insert([
        {
            id_professor: 1,
            id_disciplina: 1,
            id_turma: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('alocacao_professor');
};
