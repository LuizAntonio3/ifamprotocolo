
exports.up = function(knex, Promise) {
  return knex.schema.createTable('servico_solicitacao', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.integer('id_servico').unsigned().notNull().references('servico.id');
        t.integer('id_solicitacao').unsigned().notNull().references('solicitacao.id');

    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('servico_solicitacao');
};
