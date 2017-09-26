var HttpStatus = require('http-status-codes');
var _operador = require('../models/operador')

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
        nome: req.body.nome || model.get('nome'),
        email: req.body.email || model.get('email'),
        senha: req.body.senha || model.get('senha'),
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
    .catch(function (error) {
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
        nome: req.body.nome || model.get('nome'),
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

/* login*/
  login: function(req, res, next) {
    console.log('POST /login');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check _aluno data
    if (!req.body) {
      var message = 'Not Found.';

      console.log(message)

      return res.status(HttpStatus.BAD_REQUEST)
                .json({
                      resp: JSON.stringify({
                            message: message,
                            data: req.body
                          })
                    });
    }

    var email = req.body.email
    var senha = req.body.senha

    if (!email || !senha) {
      var message = 'Not Found.';

      console.log(message)

      return res.status(HttpStatus.BAD_REQUEST)
                .json({
                      resp: JSON.stringify({
                            message: message,
                            data: req.body
                          })
                    });
    }

    _operador
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(model) {
      console.log(model)
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
  }
}

module.exports = operadorControl;
