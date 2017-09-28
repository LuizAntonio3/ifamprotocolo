var _servico_departamento = require('../models/servico_departamento')
var _api = require('./api')

var servico_departamentoControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /servico_departamento');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all
    _servico_departamento
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
    console.log('POST /servico_departamento');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // parse body data
    var data = {
      createdAt: new Date().toISOString(),
      id_servico: req.body.id_servico,
      id_departamento: req.body.id_departamento
      };

    // TODO: check if already exists

    // Create 
    new _servico_departamento(data)
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
    console.log('PUT /servico_departamento');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _servico_departamento
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
        id_servico: req.body.id_servico || model.get('id_servico'),
        id_departamento: req.body.id_departamento || model.get('id_departamento'),
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
    console.log('DELETE /servico_departamento');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _servico_departamento
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }
      
      model
      .save({
        id_servico: req.body.id_servico || model.get('id_servico'),
        id_departamento: req.body.id_departamento || model.get('id_departamento'),
        createdAt: model.get('createdAt'),
        updatedAt: model.get('updatedAt'),
        deletedAt: new Date().toISOString(),
      })
      .then(function (model) {
        _api.handleSuccess(model, res)
      })
    })
    .catch(function(error) {
      console.log(erroror)
      console.log("not found");
      _api.handleException(error, res)
    })
  },
  
  findOne: function(req, res, next) {
    console.log('GET /servico_departamento/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _servico_departamento
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
    console.log('GET /servico_departamento/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _servico_departamento
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

module.exports = servico_departamentoControl;
