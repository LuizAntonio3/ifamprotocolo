exports.up = function(knex, Promise) {
  return knex.schema.createTable('departamento', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
    }).then(function() {
      return knex('departamento').insert([
        {
            createdAt: new Date().toISOString(), 
            nome: "matematica"
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('servico_departamento')
  .then(function () {
    return knex.schema.dropTableIfExists('departamento');
  });
};
