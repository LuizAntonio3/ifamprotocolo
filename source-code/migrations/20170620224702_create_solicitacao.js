exports.up = function(knex, Promise) {
  return knex.schema.createTable('solicitacao', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('status').notNull();
        t.integer('id_servico').unsigned().notNull().references('servico.id');
        t.integer('id_usuario').unsigned().notNull().references('usuario.id');
        t.integer('id_departamento').unsigned().notNull().references('departamento.id');
    })
    .then(function() {
      return knex('solicitacao').insert([
        {
            createdAt: new Date().toISOString(), 
            status: "Pendente",
            id_servico: 1,
            id_usuario: 1,
            id_departamento: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('solicitacao');
};
