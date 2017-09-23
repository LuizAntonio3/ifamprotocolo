exports.up = function(knex, Promise) {
  return knex.schema.createTable('servico_disciplina', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.integer('id_servico').unsigned().notNull().references('servico.id');;
        t.integer('id_disciplina').unsigned().notNull().references('disciplina.id');;
    }).then(function() {
      return knex('servico_disciplina').insert([
        {
            id_servico: 1,
            id_disciplina: 1
        }
      ]
      );
    })
    ;
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('servico_disciplina');
};
