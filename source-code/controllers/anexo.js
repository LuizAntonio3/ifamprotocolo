var _anexo = require('../models/anexo')
var _api = require('./api')

var anexoControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /anexo');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all
    _anexo
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
    console.log('POST /anexo');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // parse body data
    var data = {
      createdAt: new Date().toISOString(),
      caminho: req.body.caminho,
      id_solicitacao: req.body.id_solicitacao
      };

    // TODO: check if already exists

    // Create 
    new _anexo(data)
    .save()
    .then(function (model) {
      _api.handleSuccess(model, res)
    }).catch(function(error) {
      _api.handleException(error, res)
    })
  },
/* upload */
  upload: function(req, res, next) {
    console.log('POST /upload');
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);

    console.log(req.params);
    console.log(req.query);

    _api.handleSuccess({
                          originalname: req.file.originalname, 
                          newname: req.file.filename
                        }, res)
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /anexo');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _anexo
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
        caminho: req.body.caminho || model.get('caminho'),
        id_solicitacao: req.body.id_solicitacao || model.get('id_solicitacao'),
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
    console.log('DELETE /anexo');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _anexo
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }
      
      model
      .save({
        caminho: req.body.caminho || model.get('caminho'),
        id_solicitacao: req.body.id_solicitacao || model.get('id_solicitacao'),
        createdAt: model.get('createdAt'),
        updatedAt: model.get('updatedAt'),
        deletedAt: new Date().toISOString(),
      })
      .then(function (model) {
        _api.handleNotFound(model, res)
      })
    })
    .catch(function(error) {
      _api.handleException(error, res)
    })
  },
  
  findOne: function(req, res, next) {
    console.log('GET /anexo/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _anexo
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function(model) {
      if (model) {
        _api.handleNotFound(model, res)
      }
      else {
        return res.status(404).json()
      }
    })
    .catch(function(error) {
      _api.handleException(error, res)
    })
  },

  listRange: function(req, res, next) {
    console.log('GET /anexo/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _anexo
    .query(function(qb) {
      qb
      .where('deletedAt', '=', null)
      .limit(req.params.limit)
      .offset(req.params.offset);
    })
    .fetchAll()
    .then(function(models) {
      _api.handleNotFound(models, res)
    })
    .catch(function(error) {
      _api.handleException(error, res)
    })
  }
}

module.exports = anexoControl;
