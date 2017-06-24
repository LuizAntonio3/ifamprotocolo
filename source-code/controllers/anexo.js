var _anexo = require('../models/anexo')

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
      return res.json({
        resp: JSON.stringify(models)
      });
    })
    .catch(function(error) {
      return res.status(400).json()
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
      return res.json({
        resp: JSON.stringify(model)
      });
    }).catch(function(error) {
      console.log(error)
      return res.status(400).json()
    })
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
        return res.status(404).json();
      }
      
      model
      .save({
        caminho: req.body.caminho || model.get('caminho'),
        id_solicitacao: req.body.id_solicitacao || model.get('id_solicitacao'),
        createdAt: model.get('createdAt'),
        updatedAt: new Date().toISOString(),
      })
      .then(function (model) {
        return res.json({
          resp: JSON.stringify(model)
        });
      }).catch(function(error) {
        console.log(error)
        return res.status(400).json()
      })
    })
    .catch(function (err) {
      console.log("not found");
      res.status(404).json();
    });
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
        return res.status(404).json();
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
        res.json({
          resp: JSON.stringify(model)
        });
      })
    })
    .catch(function(error) {
      console.log(error)
      console.log("not found");
      res.status(404).json();
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
        return res.json({
          resp: JSON.stringify(model)
        });
      }
      else {
        return res.status(404).json()
      }
    })
    .catch(function(error) {
      console.log(error)
      return res.status(400).json()
    })
  },
}

module.exports = anexoControl;
