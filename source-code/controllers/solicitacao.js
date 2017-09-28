var HttpStatus = require('http-status-codes');
var _solicitacao = require('../models/solicitacao')
var _departamento_solicitacao = require('../models/departamento_solicitacao')
var _servico_solicitacao = require('../models/servico_solicitacao')
var _anexo = require('../models/anexo')

var solicitacaoControl = {

  listDepartamentosBySolicitacaoId: function (id, cb) {
        // get all
        _departamento_solicitacao
        .where('id_solicitacao', id)
        .where('deletedAt', null)
        .fetchAll()
        .then(function(models) {
          console.log('departamentos')
          //console.log(models);
          cb({
            result: true,
            data: models
          });
        })
        .catch(function(error) {
          console.log('error departamentos')
          console.log(error)
          cb({
            result: false,
            data: error
          });
        })
    },
  listServicosBySolicitacaoId: function (id, cb) {
        // get all
        _servico_solicitacao
        .where('id_solicitacao', id)
        .where('deletedAt', null)
        .fetchAll()
        .then(function(models) {
          console.log('serviços')
          //console.log(models);
          cb({
            result: true,
            data: models
          });
        })
        .catch(function(error) {
          console.log('error serviços')
          console.log(error)
          cb({
            result: false,
            data: error
          });
        })
    },
  listAnexosBySolicitacaoId: function (id, cb) {
        // get all
        _anexo
        .where('id_solicitacao', id)
        .where('deletedAt', null)
        .fetchAll()
        .then(function(models) {
          console.log('anexos')
          //console.log(models);

          cb({
            result: true,
            data: models
          });
        })
        .catch(function(error) {
          console.log('error anexos')
          console.log(error)

          cb({
            result: false,
            data: error
          });
        })
    },
  /*list all*/
  listAll: function(req, res, next) {
    console.log('GET /solicitacao');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all
    _solicitacao
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
    console.log('POST /solicitacao');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check user data
    if (!req.body) {
      var message = "Parâmetros não encontrados";
      _api.handleInvalidRequest(req.body, res)
    }

    if (req.body.id_usuario <= 0) {
      var message = "Usuário não informado";
      console.log(message)
      
      _api.handleInvalidRequest(req.body, res)
    }

    // parse body data
    var data = {
      id_usuario: req.body.id_usuario,
    };
  
    const departamentos = req.body.departamentos;
    const servicos = req.body.servicos;
    const anexos = req.body.anexos;

    if (departamentos.length == 0) {
      var message = "Departamentos não informados";
      console.log(message)
      
      _api.handleInvalidRequest(req.body, res)
    }

    if (servicos.length == 0) {
      var message = "Serviços não informados";
      console.log(message)
      
      _api.handleInvalidRequest(req.body, res)
    }

    // TODO: check if already exists. how?

    // Create 
    new _solicitacao(data)
    .save()
    .then(function (solicitacao) {

      // add anexos

      // bind with departments
      for (i = 0; i < departamentos.length; i++) {
        console.log(departamentos[i]);
        var dep = departamentos[i];
        // add dep
        new _departamento_solicitacao({
          id_solicitacao: solicitacao.id,
          id_departamento: dep
        })
        .save()
        .then((modelDep) => {
          console.log('departamento salvo: ', modelDep);

        })
        .catch((error) =>{
          console.log(error)
          var message = 'Erro ao vincular a requisição id='+ solicitacao.id +' ao departamento id=' + dep +'.';

          console.log(message)

          _api.handleException(error, res)
        })
      }

      // bind with anexos
      for (i = 0; i < anexos.length; i++) {
        console.log(anexos[i]);
        var anexo = anexos[i];
        // add anexo
        new _anexo({
          id_solicitacao: solicitacao.id,
          originalname: anexo.originalname,
          newname: anexo.newname, 
        })
        .save()
        .then((model) => {
          console.log('anexo salvo: ', model);
        })
        .catch((error) =>{
          console.log(error)
          var message = 'Erro ao vincular a requisição id='+ solicitacao.id +' ao anexo com originalname=\"' + anexo.originalname +'\" e  newname=\"' + anexo.newname +'\" .';

          console.log(message)

          _api.handleException(error, res)
        })
      }

      // bind with services
      for (i = 0; i < servicos.length; i++) {
        console.log(servicos[i]);
        var serv = servicos[i];
        // add serv
        new _servico_solicitacao({
          id_solicitacao: solicitacao.id,
          id_servico: serv
        })
        .save()
        .then((model) => {
          console.log('serviço salvo: ', model);
          // last item?
          if (i === servicos.length) {
            //return success
          _api.handleSuccess(model, res)
          }
        })
        .catch((error) =>{
          console.log(error)
          var message = 'Erro ao vincular a requisição id='+ solicitacao.id +' ao serviço id=' + serv +'.';

          console.log(message)

          _api.handleException(error, res)
        })
      }

    }).catch(function(error) {
      console.log(error)
      var message = 'Erro ao salvar a requisição com o usuário id='+ data.id_usuario +'.';

      console.log(message)

      _api.handleException(error, res)
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /solicitacao');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters
    // TODO: check user data
    if (!req.body) {
      var message = "Parâmetros não encontrados";
      _api.handleInvalidRequest(req.body, res)
    }

    if (req.body.id_usuario <= 0) {
      var message = "Usuário não informado";
      console.log(message)
      _api.handleInvalidRequest(req.body, res)
    }

    // parse body data
    var data = {
      id_usuario: req.body.id_usuario,
    };
  
    var newDepartamentos = req.body.departamentos;
    var newServicos = req.body.servicos;
    var newAnexos = req.body.anexos;

    if (newDepartamentos.length == 0) {
      var message = "Departamentos não informados";
      console.log(message)
      
      _api.handleInvalidRequest(req.body, res)
    }

    if (newServicos.length == 0) {
      var message = "Serviços não informados";
      console.log(message)
      _api.handleInvalidRequest(req.body, res)
    }

    // update
    _solicitacao
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (solicitacaoFounded) {
      
      // not founded?
      if(solicitacaoFounded == null){
        _api.handleNotFound(solicitacaoFounded, res)
      }
      
      solicitacaoFounded
      .save({
        id_usuario: data.id_usuario || solicitacaoFounded.get('id_usuario'),
        createdAt: solicitacaoFounded.get('createdAt'),
        updatedAt: new Date().toISOString(),
      }, {patch: true})
      .then(function (solicitacaoUpdated) {

        // look to existents department
        solicitacaoControl.listDepartamentosBySolicitacaoId(solicitacaoUpdated.id, function (result) {
          console.log(result)
          if (result.result) {
              // remove department ids
              result.data.map((oldDepto) =>{
                  oldDepto
                  .save({updatedAt: new Date().toISOString(),deletedAt: new Date().toISOString()}, {patch: true})
                  .then(function (oldDeptoRemoved) {
                    console.log('departamento removido',oldDeptoRemoved)
                    
                  })
                  .catch(function (error) {
                    console.log(error);
                  
                    var message = "Erro a remover departamento";
                    console.log(message)
                    
                    _api.handleException(error, res)
                  })
              })
          }
        });

        // look to existents services
        solicitacaoControl.listServicosBySolicitacaoId(solicitacaoUpdated.id, function (result) {
          console.log(result)
          if (result.result) {
            // remove service ids
            result.data.map((oldSevco) =>{
                oldSevco
                .save({updatedAt: new Date().toISOString(),deletedAt: new Date().toISOString()}, {patch: true})
                .then(function (oldServRemoved) {
                  console.log('serviço removido',oldServRemoved)
                })
                .catch(function (error) {
                  console.log(error);
                
                  var message = "Erro a remover serviço";
                  console.log(message)
                  
                  _api.handleException(error, res)
                })
            })            
          }
        });

        // look to existents anexos
        solicitacaoControl.listAnexosBySolicitacaoId(solicitacaoUpdated.id, function (result) {
          console.log(result)
          if (result.result) {
            // remove anexos ids
            result.data.map((oldAnexo) =>{
                oldAnexo
                .save({updatedAt: new Date().toISOString(),deletedAt: new Date().toISOString()}, {patch: true})
                .then(function (updatedAnexo) {
                  console.log('anexo removido',updatedAnexo)
                })
                .catch(function (error) {
                  console.log(error);
                
                  var message = "Erro a remover anexo";
                  console.log(message)
                  
                  _api.handleException(error, res)
                })
            })            
          }
        });


        // add new anexos
        newAnexos.map((newAnexo) => {
          console.log(newAnexo);
          var anexo = newAnexo;
          // add anexo
          new _anexo({
            id_solicitacao: solicitacaoUpdated.id,
            originalname: anexo.originalname,
            newname: anexo.newname, 
          })
          .save()
          .then((anexoSAved) => {
            console.log('anexo salvo: ', anexoSAved);
          })
          .catch((error) =>{
            console.log(error)
            var message = 'Erro ao vincular a requisição id='+ model.id 
                          +' ao anexo com originalname=\"' + anexo.originalname 
                          +'\" e  newname=\"' + anexo.newname +'\" .';

            console.log(message)

            _api.handleException(error, res)
          })
        })

        // add new departamentos
        for (i = 0; i < newDepartamentos.length; i++) {
          console.log(newDepartamentos[i]);
          var dep = newDepartamentos[i];
          // add dep
          new _departamento_solicitacao({
            id_solicitacao: solicitacaoUpdated.id,
            id_departamento: dep
          })
          .save()
          .then((modelDep) => {
            console.log('departamento salvo: ', modelDep);

          })
          .catch((error) =>{
            console.log(error)
            var message = 'Erro ao vincular a requisição id='+ solicitacao.id 
                                      +' ao departamento id=' + dep +'.';

            console.log(message)

            _api.handleException(error, res)
          })
        }
        // console.log(newDepartamentos)
        // newDepartamentos.map((newDepto) => {
        //   console.log('new departamento',newDepto);
        //   var dep = newDepto;
        //   // add dep
        //   new _departamento_solicitacao({
        //     id_solicitacao: model.id,
        //     id_departamento: dep
        //   })
        //   .save()
        //   .then((modelDep) => {
        //     console.log('departamento salvo: ', modelDep);

        //   })
        //   .catch((error) =>{
        //     console.log(error)
        //     var message = 'Erro ao vincular a requisição id='+ model.id 
        //                   +' ao departamento id=' + dep +'.';

        //     console.log(message)

        //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        //               .json({
        //                     resp: JSON.stringify({
        //                           message: message
        //                         })
        //                   });
        //   })
        // })

        // add new servicos
        newServicos.map((newServico, i) =>{
          console.log('new servico',newServico);
          var serv = newServico;
          // add serv
          new _servico_solicitacao({
            id_solicitacao: solicitacaoUpdated.id,
            id_servico: serv
          })
          .save()
          .then((modelServ) => {
            console.log('serviço salvo: ', modelServ);
            // last item?
            if (i + 1 === newServicos.length) {
              //return success
              _api.handleSuccess(modelServ, res)
            }
          })
          .catch((error) =>{
            console.log(error)
            var message = 'Erro ao vincular a requisição id='+ model.id 
                            +' ao serviço id=' + serv +'.';

            console.log(message)

            _api.handleException(error, res)
          })
        })
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
    console.log('DELETE /solicitacao');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _solicitacao
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }
      
      model
      .save({
        status: req.body.status || model.get('status'),
        id_servico: req.body.id_servico || model.get('id_servico'),
        id_usuario: req.body.id_usuario || model.get('id_usuario'),
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
      console.log(error)
      console.log("not found");
      _api.handleException(error, res)
    })
  },
  
  findOne: function(req, res, next) {
    console.log('GET /solicitacao/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _solicitacao
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
    console.log('GET /solicitacao/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _solicitacao
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
  findDepartamentos: function(req, res, next) {
    console.log('GET /solicitacao/:id/departamento');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get all
    var result = solicitacaoControl.listDepartamentosBySolicitacaoId(req.params.id, function (result) {
        console.log(result);

        if (result.result) {
          _api.handleSuccess(result.data, res)
        } else {
          _api.handleInvalidRequest(result.data, res)
        }
    });
  },
  findServicos: function(req, res, next) {
    console.log('GET /solicitacao/:id/servico');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get all
    var result = solicitacaoControl.listServicosBySolicitacaoId(req.params.id, function (result) {
        console.log(result);

        if (result.result) {
          _api.handleSuccess(result.data, res) 
        } else {
          _api.handleInvalidRequest(result.data, res)
        }
    });
  },
  findAnexos: function(req, res, next) {
    console.log('GET /solicitacao/:id/anexo');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get all
    var result = solicitacaoControl.listAnexosBySolicitacaoId(req.params.id, function (result) {
        console.log(result);

        if (result.result) {
          _api.handleSuccess(result.data, res)  
        } else {
          _api.handleInvalidRequest(result.data, res)
        }
    });
  }
}

module.exports = solicitacaoControl;
