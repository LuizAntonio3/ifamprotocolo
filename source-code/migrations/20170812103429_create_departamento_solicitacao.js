
exports.up = function(knex, Promise) {
  return knex.schema.createTable('departamento_solicitacao', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.integer('id_departamento').unsigned().notNull().references('departamento.id');
        t.integer('id_solicitacao').unsigned().notNull().references('solicitacao.id');

    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('departamento_solicitacao');
};
