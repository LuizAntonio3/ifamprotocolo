
exports.up = function(knex, Promise) {
  return knex.schema.createTable('departamento_solicitacao', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.integer('id_departamento').unsigned().notNull().references('departamento.id');
        t.integer('id_solicitacao').unsigned().notNull().references('solicitacao.id');

    }).then(function() {
      return knex('departamento_solicitacao').insert([
        {
            createdAt: new Date().toISOString(), 
            id_departamento: 1,
            id_solicitacao: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('departamento_solicitacao');
};
