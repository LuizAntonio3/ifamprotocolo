exports.up = function(knex, Promise) {
  return knex.schema.createTable('usuario', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.string('senha').notNull();
        t.string('email').notNull();

        t.integer('id_company_func').unique().references('company.id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('usuario')
                    .dropTable('denuncia');
};
