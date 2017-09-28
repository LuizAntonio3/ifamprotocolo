var _turma = require('../models/turma')
var _api = require('./api')

var _turmaControl = {
  listByName: function(req, res, next) {
    console.log('GET /turma/:nome');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);


    // get all turmas
    _turma
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
    console.log('GET /turma');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);


    // get all turmas
    _turma
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      console.log("models")
      console.log(models);
      _api.handleSuccess(models, res)
    })
    .catch(function(error) {
      console.log("error")
      console.log(error)
      _api.handleException(error, res)
    })
  },

/* create */
  create: function(req, res, next) {
    console.log('POST /turma');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check if _turma already exists

    // Create _turma
    new _turma({
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
      complemento: req.body.complemento
    })
    .save()
    .then(function (usu) {
      _api.handleSuccess(models, res)
    }).catch(function(error) {
      console.log(error)
      _api.handleException(error, res)
    })
  },

/* login*/
  login: function(req, res, next) {
    console.log('POST /login');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check _turma data
    if (!req.body) {
      console.log("Invalid request")
      _api.handleInvalidRequest(req.body, res)
    }

    var email = req.body.email
    var senha = req.body.senha

    if (!email || !senha) {
      console.log("Invalid credentials")
      _api.handleInvalidRequest(req.body, res)      
    }

    _turma
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(usr) {
      if (usr) {
        console.log("_turma found")
        _api.handleSuccess(usr, res)
      }
      else {
        console.log("turma not found")
        _api.handleNotFound(usr, res)
      }

    }).catch(function(error) {
      console.log("Exception: "+error)
      _api.handleException(error, res)
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /update');
    console.log(req.body);
    console.log(req.params);

    // Update
    _turma
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (_turma) {

      // not founded?
      if(_turma == null){
        _api.handleNotFound(_turma, res)
      }

      _turma.save({
        nome: req.body.nome  || _turma.get('nome'),
        tipo: req.body.tipo  || _turma.get('tipo'),
        email: req.body.email || _turma.get('email'),
        senha: req.body.senha  || _turma.get('senha'),
        telefone: req.body.telefone  || _turma.get('telefone'),
        matricula: req.body.matricula  || _turma.get('matricula'),
        logradouro: req.body.logradouro  || _turma.get('logradouro'),
        numero: req.body.numero  || _turma.get('numero'),
        bairro: req.body.bairro  || _turma.get('bairro'),
        complemento: req.body.complemento  || _turma.get('complemento'),
        createdAt: _turma.get('createdAt'),
        updatedAt: new Date().toISOString()
      })
      .then(function (usr) {
        _api.handleSuccess(model, res)
      })
      .catch(function (error) {
        _api.handleException(error, res)
      });
    })
    .catch(function (error) {
      _api.handleException(error, res)
    });
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /turma');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    
    // TODO: check if _turma exists
    
    // destroy
    _turma
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
        createdAt: model.get('createdAt'),
        updatedAt: new Date().toISOString(),
        deletedAt: new Date().toISOString(),
      })
      .then(function (model) {
        _api.handleSuccess(model, res)
      })
    })
    .catch(function(error) {
      console.log(error)
      console.log("not found");
      _api.handleException(error, res)
    })
  },
  // /api/v1/turmas/:id -> um turma
  findOne: function(req, res, next) {
      console.log('GET /');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);
      console.log(req.decoded);
      
      // get one turma
      _turma
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
        console.log(error)
        _api.handleException(error, res)
      })
    },
    listRange: function(req, res, next) {
      console.log('GET /turma/:offset/:limit');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);

      var offset = parseInt(req.params.offset, 10);
      var limit = parseInt(req.params.limit, 10);


      // get one 
      _turma
      .query(function(qb) {
        qb
        .offset(offset)
        .limit(limit);
      })
      .fetchAll()
      .then(function(models) {
        //console.log(models);
        _api.handleSuccess(models, res)
      })
      .catch(function(error) {
        //console.log(error);
        _api.handleException(error, res)
      })
    }

}

module.exports = _turmaControl;
