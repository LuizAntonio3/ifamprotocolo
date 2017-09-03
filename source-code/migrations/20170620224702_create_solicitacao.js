exports.up = function(knex, Promise) {
  return knex.schema.createTable('solicitacao', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('status').notNull();
        t.integer('id_usuario').unsigned().notNull().references('usuario.id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('solicitacao');
};
