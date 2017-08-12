exports.up = function(knex, Promise) {
  return knex.schema.createTable('solicitacao', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('status').notNull();
        t.integer('id_usuario').unsigned().notNull().references('usuario.id');
    })
    .then(function() {
      return knex('solicitacao').insert([
        {
            createdAt: new Date().toISOString(), 
            status: "Pendente",
            id_usuario: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('solicitacao');
};
