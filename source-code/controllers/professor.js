var _professor = require('../models/professor')
var _api = require('./api')

var professorControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all
    _professor
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
    console.log('POST /professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // parse body data
    var data = {
      createdAt: new Date().toISOString(),
      nome: req.body.nome
      };

    // TODO: check if already exists

    // Create 
    new _professor(data)
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
    console.log('PUT /professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _professor
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
    console.log('DELETE /professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _professor
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
    console.log('GET /professor/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _professor
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
    console.log('GET /professor/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _professor
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

module.exports = professorControl;
