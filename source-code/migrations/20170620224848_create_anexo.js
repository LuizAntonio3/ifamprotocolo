exports.up = function(knex, Promise) {
  return knex.schema.createTable('anexo', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('caminho').notNull();
        t.integer('id_solicitacao').references('solicitacao.id');

    }).then(function() {
      return knex('anexo').insert([
        {
            createdAt: new Date().toISOString(), 
            caminho: "robson.txt",
            id_solicitacao: "1"
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('anexo');
};
