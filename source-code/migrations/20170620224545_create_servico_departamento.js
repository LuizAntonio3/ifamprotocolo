exports.up = function(knex, Promise) {
  return knex.schema.createTable('servico_departamento', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.integer('id_servico').references('servico.id');;
        t.integer('id_departamento').references('departamento.id');;
    }).then(function() {
      return knex('servico_departamento').insert([
        {
            createdAt: new Date().toISOString(), 
            id_servico: 1,
            id_departamento: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('servico_departamento');
};
