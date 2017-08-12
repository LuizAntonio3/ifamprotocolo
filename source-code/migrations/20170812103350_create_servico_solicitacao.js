
exports.up = function(knex, Promise) {
  return knex.schema.createTable('servico_solicitacao', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.integer('id_servico').unsigned().notNull().references('servico.id');
        t.integer('id_solicitacao').unsigned().notNull().references('solicitacao.id');

    }).then(function() {
      return knex('servico_solicitacao').insert([
        {
            createdAt: new Date().toISOString(), 
            id_servico: 1,
            id_solicitacao: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('servico_solicitacao');
};
