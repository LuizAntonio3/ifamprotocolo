var _servico_disciplina = require('../models/servico_disciplina')
var _api = require('./api')

var servico_disciplinaControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /servico_disciplina');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get all
    _servico_disciplina
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
    console.log('POST /servico_disciplina');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // parse body data
    var data = {
      createdAt: new Date().toISOString(),
      id_servico: req.body.id_servico,
      id_disciplina: req.body.id_disciplina,
      };

    // TODO: check if already exists

    // Create 
    new _servico_disciplina(data)
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
    console.log('PUT /servico_disciplina');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _servico_disciplina
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
        id_servico: req.body.id_servico,
        id_disciplina: req.body.id_disciplina,
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
    .catch(function (err) {
      console.log("not found");
      _api.handleException(error, res)
    });
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /servico_disciplina');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _servico_disciplina
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }
      
      model
      .save({
        id_servico: req.body.id_servico,
        id_disciplina: req.body.id_disciplina,
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
    console.log('GET /servico_disciplina/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _servico_disciplina
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
    console.log('GET /servico_disciplina/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _servico_disciplina
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

module.exports = servico_disciplinaControl;
