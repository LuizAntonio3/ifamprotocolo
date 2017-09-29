exports.up = function(knex, Promise) {
  return knex.schema.createTable('departamento', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.integer('id_responsavel_departamento').unsigned().notNull().references('responsavel_departamento.id');;
    }).then(function() {
      return knex('departamento').insert([
        {
            nome: "matematica",
            id_responsavel_departamento: 1
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
