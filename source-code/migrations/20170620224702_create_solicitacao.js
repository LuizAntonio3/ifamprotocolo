exports.up = function(knex, Promise) {
  return knex.schema.createTable('solicitacao', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.integer('id_aluno').unsigned().notNull().references('aluno.id');
    }).then(function() {
      return knex('solicitacao').insert([
        {
            id_aluno: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('solicitacao');
};
