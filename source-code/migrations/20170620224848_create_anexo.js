exports.up = function(knex, Promise) {
  return knex.schema.createTable('anexo', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('caminho').notNull();
        t.integer('id_solicitacao').unsigned().notNull().references('solicitacao.id');

    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('anexo');
};
