var HttpStatus = require('http-status-codes');
var _curso = require('../models/curso')

var cursoControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /curso');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all
    _curso
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      console.log(models)

      return res.json({
                      resp: JSON.stringify({
                            message: "Operação realizada com sucesso.",
                            data: models
                          })
                    });
    })
    .catch(function(error) {
      console.log(error)
      var message = 'Exceção.';

      console.log(message)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                      resp: JSON.stringify({
                            message: message,
                            data: error
                          })
                    });
    })
  },
/* create */
  create: function(req, res, next) {
    console.log('POST /curso');
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
    new _curso(data)
    .save()
    .then(function (model) {
      return res.json({
                      resp: JSON.stringify({
                            message: "Operação realizada com sucesso.",
                            data: model
                          })
                    });
    }).catch(function(error) {
      console.log(error)
      var message = 'Exceção.';

      console.log(message)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                      resp: JSON.stringify({
                            message: message,
                            data: error
                          })
                    });
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /curso');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _curso
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (model) {
      
      // not founded?
      if(model == null){
        var message = 'Not Found.';

        console.log(message)

        return res.status(HttpStatus.NOT_FOUND)
                  .json({
                        resp: JSON.stringify({
                              message: message,
                              data: model
                            })
                      });
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
                        resp: JSON.stringify({
                              message: "Operação realizada com sucesso.",
                              data: model
                            })
                      });
      }).catch(function(error) {

        console.log(error)
        var message = 'Exceção.';

        console.log(message)

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json({
                        resp: JSON.stringify({
                              message: message,
                              data: error
                            })
                      });
      })
    })
    .catch(function (err) {
      console.log(error)
      var message = 'Exceção.';

      console.log(message)

      return res.status(HttpStatus.NOT_FOUND)
                .json({
                      resp: JSON.stringify({
                            message: message,
                            data: error
                          })
                    });
    });
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /curso');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _curso
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        var message = 'Not Found.';

        console.log(message)

        return res.status(HttpStatus.NOT_FOUND)
                  .json({
                        resp: JSON.stringify({
                              message: message,
                              data: model
                            })
                      });
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
        return res.json({
                        resp: JSON.stringify({
                              message: "Operação realizada com sucesso.",
                              data: model
                            })
                      });
      })
    })
    .catch(function(error) {
      console.log(error)
      var message = 'Exceção.';

      console.log(message)

      return res.status(HttpStatus.NOT_FOUND)
                .json({
                      resp: JSON.stringify({
                            message: message,
                            data: error
                          })
                    });
    })
  },
  
  findOne: function(req, res, next) {
    console.log('GET /curso/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _curso
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function(model) {
      if (model) {
      return res.json({
                      resp: JSON.stringify({
                            message: "Operação realizada com sucesso.",
                            data: model
                          })
                    });
      }
      else {
        var message = 'Not Found.';

        console.log(message)

        return res.status(HttpStatus.NOT_FOUND)
                  .json({
                        resp: JSON.stringify({
                              message: message,
                              data: model
                            })
                      });
      }
    })
    .catch(function(error) {
      console.log(error)
      var message = 'Exceção.';

      console.log(message)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                      resp: JSON.stringify({
                            message: message,
                            data: error
                          })
                    });
    })
  },

  listRange: function(req, res, next) {
    console.log('GET /curso/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _curso
    .query(function(qb) {
      qb
      .where('deletedAt', '=', null)
      .limit(req.params.limit)
      .offset(req.params.offset);
    })
    .fetchAll()
    .then(function(models) {
      return res.json({
                      resp: JSON.stringify({
                            message: "Operação realizada com sucesso.",
                            data: models
                          })
                    });
    })
    .catch(function(error) {
      console.log(error)
      var message = 'Exceção.';

      console.log(message)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                      resp: JSON.stringify({
                            message: message,
                            data: error
                          })
                    });
    })
  }
}

module.exports = cursoControl;
