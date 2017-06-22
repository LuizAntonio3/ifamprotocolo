exports.up = function(knex, Promise) {
  return knex.schema.createTable('servico', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
    }).then(function() {
      return knex('servico').insert([
        {
            createdAt: new Date().toISOString(), 
            nome: "Abono"
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('servico');
};
