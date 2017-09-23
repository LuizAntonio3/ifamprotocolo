exports.up = function(knex, Promise) {
  return knex.schema.createTable('aluno', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('nome').notNull();
        t.string('email').notNull();
        t.string('senha').notNull();
        t.string('telefone').notNull();
        t.string('matricula').notNull();
        t.string('cpf').notNull();
        t.string('logradouro').notNull();
        t.string('numero').notNull();
        t.string('bairro').notNull();
        t.string('complemento').notNull();
        t.integer('id_turma').unsigned().notNull().references('turma.id');

    }).then(function() {
      return knex('aluno').insert([
        {
            nome: "robson",
            email: "robson.rojas@gmail.com",
            senha: "123",
            telefone: "999999999",
            matricula: "12345678",
            cpf:'82202320210',
            logradouro: "rua santa tereza, c2",
            numero: "8",
            bairro: "zumbi",
            complemento: "dos palmares",
            id_turma: 1
        }
      ]
      );
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('aluno');
};
