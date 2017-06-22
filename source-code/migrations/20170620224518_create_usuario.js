exports.up = function(knex, Promise) {
  return knex.schema.createTable('usuario', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.string('email').notNull();
        t.string('senha').notNull();
        t.string('telefone').notNull();
        t.string('matricula').notNull();
        t.string('logradouro').notNull();
        t.string('numero').notNull();
        t.string('bairro').notNull();
        t.string('complemento').notNull();

    }).then(function() {
      return knex('usuario').insert([
        {
            createdAt:new Date().toISOString(), 
            nome: "robson",
            email: "robson.rojas@gmail.com",
            senha: "123",
            telefone: "999999999",
            matricula: "12345678",
            logradouro: "rua santa tereza, c2",
            numero: "8",
            bairro: "zumbi",
            complemento: "dos palmares"
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('usuario');
};
