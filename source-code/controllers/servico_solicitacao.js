var _servico_solicitacao = require('../models/servico_solicitacao')
var _api = require('./api')

var servico_solicitacaoControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /servico_solicitacao');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get all
    _servico_solicitacao
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      console.log(models)
      _api.handleSuccess(models, res)
    })
    .catch(function(error) {
      _api.handleException(error, res)
    })
  },
/* create */
  create: function(req, res, next) {
    console.log('POST /servico_solicitacao');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // parse body data
    var data = {
      createdAt: new Date().toISOString(),
      abono: req.body.abono
      };

    // TODO: check if already exists

    // Create 
    new _servico_solicitacao(data)
    .save()
    .then(function (model) {
      _api.handleSuccess(model, res)
    }).catch(function(error) {
      console.log(error)
      _api.handleException(error, res)
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /servico_solicitacao');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _servico_solicitacao
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
        createdAt: model.get('createdAt'),
        updatedAt: new Date().toISOString(),
      })
      .then(function (model) {
        _api.handleSuccess(model, res)
      }).catch(function(error) {
        console.log(error)
        _api.handleException(error, res)
      })
    })
    .catch(function (error) {
      console.log("not found");
      _api.handleException(error, res)
    });
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /servico_solicitacao');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _servico_solicitacao
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
      console.log(error)
      console.log("not found");
      _api.handleException(error, res)
    })
  },
  
  findOne: function(req, res, next) {
    console.log('GET /servico_solicitacao/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _servico_solicitacao
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
    console.log('GET /servico_solicitacao/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _servico_solicitacao
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
  }
}

module.exports = servico_solicitacaoControl;
