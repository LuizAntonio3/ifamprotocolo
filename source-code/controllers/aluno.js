var _api = require('./api')
var _aluno = require('../models/aluno')

var _alunoControl = {
  listByName: function(req, res, next) {
    console.log('GET /aluno/:nome');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);


    // get all alunos
    _aluno
    .query(function(qb) {
      qb
      .select('id', 'nome')
      .whereNull('deletedAt')
      .where('nome', 'like', req.params.nome+'%')

    })
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      _api.handleSuccess(models, res)
    })
    .catch(function(error) {
      _api.handleException(error, res)
    })
  },
  listAll: function(req, res, next) {
    console.log('GET /aluno');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get all alunos
    _aluno
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      _api.handleSuccess(models, res)
    })
    .catch(function(error) {
      _api.handleException(error, res)
    })
  },

/* create */
  create: function(req, res, next) {
    console.log('POST /aluno');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check if _aluno already exists

    // Create _aluno
    new _aluno({
      createdAt: new Date().toISOString(),
      nome: req.body.nome,
      tipo: req.body.tipo,
      email: req.body.email,
      senha: req.body.senha,
      telefone: req.body.telefone,
      matricula: req.body.matricula,
      logradouro: req.body.logradouro,
      numero: req.body.numero,
      bairro: req.body.bairro,
      complemento: req.body.complemento,
      id_turma: req.body.id_turma
    })
    .save()
    .then(function (model) {
      _api.handleSuccess(model, res)
    }).catch(function(error) {
      _api.handleException(error, res)
    })
  },

/* login*/
  login: function(req, res, next) {
    console.log('POST /login');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check _aluno data
    if (!req.body) {
      _api.handleInvalidRequest(req.body, res)
    }

    var email = req.body.email
    var senha = req.body.senha

    if (!email || !senha) {
      _api.handleInvalidRequest(req.body, res)
    }

    _aluno
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(model) {
      _api.handleSuccess(model, res)
    }).catch(function(error) {
      _api.handleException(error, res)
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /update');
    console.log(req.body);
    console.log(req.params);

    // Update
    _aluno
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }

      _aluno.save({
        nome: req.body.nome  || model.get('nome'),
        tipo: req.body.tipo  || model.get('tipo'),
        email: req.body.email || model.get('email'),
        senha: req.body.senha  || model.get('senha'),
        telefone: req.body.telefone  || model.get('telefone'),
        matricula: req.body.matricula  || model.get('matricula'),
        logradouro: req.body.logradouro  || model.get('logradouro'),
        numero: req.body.numero  || model.get('numero'),
        bairro: req.body.bairro  || model.get('bairro'),
        complemento: req.body.complemento  || model.get('complemento'),
        id_turma: req.body.id_turma  || model.get('id_turma'),
        createdAt: model.get('createdAt'),
        updatedAt: new Date().toISOString()
      })
      .then(function (model) {
        _api.handleSuccess(model, res)
      }).catch(function(error) {
        _api.handleException(error, res)
      })
    })
    .catch(function (error) {
      _api.handleException(error, res)
    })
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /aluno');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    
    // TODO: check if _aluno exists
    
    // destroy
    _aluno
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }
      
      model
      .save({
        nome: req.body.nome  || model.get('nome'),
        tipo: req.body.tipo  || model.get('tipo'),
        email: req.body.email || model.get('email'),
        senha: req.body.senha  || model.get('senha'),
        telefone: req.body.telefone  || model.get('telefone'),
        matricula: req.body.matricula  || model.get('matricula'),
        logradouro: req.body.logradouro  || model.get('logradouro'),
        numero: req.body.numero  || model.get('numero'),
        bairro: req.body.bairro  || model.get('bairro'),
        complemento: req.body.complemento  || model.get('complemento'),
        id_turma: req.body.id_turma  || model.get('id_turma'),
        createdAt: model.get('createdAt'),
        updatedAt: new Date().toISOString(),
        deletedAt: new Date().toISOString(),
      })
      .then(function (model) {
        _api.handleSuccess(model, res)
      })
    })
    .catch(function(error) {
      _api.handleException(error, res)
    })
  },
  // /api/v1/alunos/:id -> um aluno
  findOne: function(req, res, next) {
      console.log('GET /');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);
      console.log(req.decoded);
      
      // get one aluno
      _aluno
      .where('id', req.params.id)
      .where('deletedAt', null)
      .fetch()
      .then(function(model) {
        if (model) {
          _api.handleSuccess(model, res)
        }
        else {
          _api.handleNotFound(model, res)
        }
      })
      .catch(function(error) {
        _api.handleException(error, res)
      })
    },
    listRange: function(req, res, next) {
      console.log('GET /aluno/:offset/:limit');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);

      var offset = parseInt(req.params.offset, 10);
      var limit = parseInt(req.params.limit, 10);

      // get one 
      _aluno
      .query(function(qb) {
        qb
        .offset(offset)
        .limit(limit);
      })
      .fetchAll()
      .then(function(models) {
        _api.handleSuccess(models, res)
      })
      .catch(function(error) {
        _api.handleException(error, res)
      })
    }
}

module.exports = _alunoControl;
