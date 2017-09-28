var _operador = require('../models/operador')
var _api = require('./api')

var operadorControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /operador');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all
    _operador
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
    console.log('POST /operador');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check if already exists

    // Create 
    new _operador({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha
    })
    .save()
    .then(function (model) {
      _api.handleSuccess(model, res)
    }).catch(function(error) {
      _api.handleException(error, res)
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /operador');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _operador
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (model) {
      
      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }
      
      model
      .save({
        nome: req.body.nome || model.get('nome'),
        email: req.body.email || model.get('email'),
        senha: req.body.senha || model.get('senha'),
        createdAt: model.get('createdAt'),
        updatedAt: new Date().toISOString(),
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
    console.log('DELETE /operador');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _operador
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }
      
      model
      .save({
        nome: req.body.nome || model.get('nome'),
        createdAt: model.get('createdAt'),
        updatedAt: model.get('updatedAt'),
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
  
  findOne: function(req, res, next) {
    console.log('GET /operador/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _operador
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
    console.log('GET /operador/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _operador
    .query(function(qb) {
      qb
      .where('deletedAt', '=', null)
      .limit(req.params.limit)
      .offset(req.params.offset);
    })
    .fetchAll()
    .then(function(models) {
      _api.handleSuccess(models, res)
    })
    .catch(function(error) {
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

    _operador
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(model) {
      _api.handleSuccess(model, res)
    }).catch(function(error) {
      _api.handleException(error, res)
    })
  }
}

module.exports = operadorControl;
