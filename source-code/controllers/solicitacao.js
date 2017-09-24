var HttpStatus = require('http-status-codes');
var _solicitacao = require('../models/solicitacao')
var _departamento_solicitacao = require('../models/departamento_solicitacao')
var _servico_solicitacao = require('../models/servico_solicitacao')
var _anexo = require('../models/anexo')

// var listDepartamentosBySolicitacaoId =function (id) {
//       // get all
//       _departamento_solicitacao
//       .where('id_solicitacao', id)
//       .where('deletedAt', null)
//       .fetchAll()
//       .then(function(models) {
//         console.log('departamentos')
//         console.log(models);

//         return {
//           result: true,
//           data: models
//         };
//       })
//       .catch(function(error) {
//         console.log('error departamentos')
//         console.log(error)
//         return {
//           result: false,
//           data: error
//         };
//       })
//   }
//   var listServicosBySolicitacaoId = function (id) {
//       // get all
//       _departamento_solicitacao
//       .where('id_solicitacao', id)
//       .where('deletedAt', null)
//       .fetchAll()
//       .then(function(models) {
//         console.log('serviços')
//         console.log(models);
//         return {
//           result: true,
//           data: models
//         };
//       })
//       .catch(function(error) {
//         console.log('error serviços')
//         console.log(error)
//         return {
//           result: false,
//           data: error
//         };
//       })
//   }
//   var listAnexosBySolicitacaoId = function (id) {
//       // get all
//       _anexo
//       .where('id_solicitacao', id)
//       .where('deletedAt', null)
//       .fetchAll()
//       .then(function(models) {
//         console.log('anexos')
//         console.log(models);
//         return {
//           result: true,
//           data: models
//         };
//       })
//       .catch(function(error) {
//         console.log('error anexos')
//         console.log(error)
//         return {
//           result: false,
//           data: error
//         };
//       })
//   }


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

      var message = "Dados consultados com sucesso.";

      return res.json({
                      resp: JSON.stringify({
                            message: message,
                            data: models
                          })
                    });
    })
    .catch(function(error) {
      return res.status(HttpStatus.BAD_REQUEST).json()
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
      console.log("Invalid request")
      var message = "Parâmetros não encontrados";
      return res.status(HttpStatus.BAD_REQUEST).json({
                                                                resp: JSON.stringify({
                                                                      message: message
                                                                    })
                                                              });
    }

    if (req.body.id_usuario <= 0) {
      var message = "Usuário não informado";
      console.log(message)
      
      return res.status(HttpStatus.BAD_REQUEST)
                .json({
                      resp: JSON.stringify({
                            message: message
                          })
                    });
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
      
      return res.status(HttpStatus.BAD_REQUEST)
                .json({
                      resp: JSON.stringify({
                            message: message
                          })
                    });
    }

    if (servicos.length == 0) {
      var message = "Serviços não informados";
      console.log(message)
      
      return res.status(HttpStatus.BAD_REQUEST)
                .json({
                      resp: JSON.stringify({
                            message: message
                          })
                    });
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

          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                                                                    resp: JSON.stringify({
                                                                          message: message
                                                                        })
                                                                  });
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

          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                                                                    resp: JSON.stringify({
                                                                          message: message
                                                                        })
                                                                  });
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
          return res.json({
                          resp: JSON.stringify({
                                message: "Requisição criada com sucesso.",
                                data: solicitacao
                              })
                        });
          }
        })
        .catch((error) =>{
          console.log(error)
          var message = 'Erro ao vincular a requisição id='+ solicitacao.id +' ao serviço id=' + serv +'.';

          console.log(message)

          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                                                                    resp: JSON.stringify({
                                                                          message: message,
                                                                          data: null
                                                                        })
                                                                  });
        })
      }

    }).catch(function(error) {
      console.log(error)
      var message = 'Erro ao salvar a requisição com o usuário id='+ data.id_usuario +'.';

      console.log(message)

      return res.status(HttpStatus.BAD_REQUEST).json({
                                                                resp: JSON.stringify({
                                                                      message: message,
                                                                      data: null
                                                                    })
                                                              });
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
      console.log("Invalid request")
      var message = "Parâmetros não encontrados";
      return res.status(HttpStatus.BAD_REQUEST).json({
                                                                resp: JSON.stringify({
                                                                      message: message
                                                                    })
                                                              });
    }

    if (req.body.id_usuario <= 0) {
      var message = "Usuário não informado";
      console.log(message)
      
      return res.status(HttpStatus.BAD_REQUEST)
                .json({
                      resp: JSON.stringify({
                            message: message
                          })
                    });
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
      
      return res.status(HttpStatus.BAD_REQUEST)
                .json({
                      resp: JSON.stringify({
                            message: message
                          })
                    });
    }

    if (newServicos.length == 0) {
      var message = "Serviços não informados";
      console.log(message)
      
      return res.status(HttpStatus.BAD_REQUEST)
                .json({
                      resp: JSON.stringify({
                            message: message
                          })
                    });
    }

    // update
    _solicitacao
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (solicitacaoFounded) {
      
      // not founded?
      if(solicitacaoFounded == null){
        return res.status(404).json();
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
                    
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                              .json({
                                    resp: JSON.stringify({
                                          message: message,
                                          data: error

                                        })
                                  });
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
                  
                  return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .json({
                                  resp: JSON.stringify({
                                        message: message,
                                        data: error

                                      })
                                });
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
                  
                  return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .json({
                                  resp: JSON.stringify({
                                        message: message,
                                        data: error

                                      })
                                });
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

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                      .json({
                            resp: JSON.stringify({
                                  message: message
                                })
                          });
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

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                      .json({
                              resp: JSON.stringify({
                                    message: message
                                  })
                            });
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
              return res.json({
                            resp: JSON.stringify({
                                  message: "Requisição atualizada com sucesso.",
                                  data: modelServ
                                })
                          });
            }
          })
          .catch((error) =>{
            console.log(error)
            var message = 'Erro ao vincular a requisição id='+ model.id 
                            +' ao serviço id=' + serv +'.';

            console.log(message)

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                      .json({
                            resp: JSON.stringify({
                                  message: message,
                                  data: null
                                })
                          });
          })
        })
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
        return res.status(404).json();
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

        //return success
        return res.json({
                        resp: JSON.stringify({
                              message: "Requisição recuperada com sucesso.",
                              data: model
                            })
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
      return res.json({
        resp: JSON.stringify(models)
      });
    })
    .catch(function(error) {
      return res.status(400).json()
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
          return res.json({
                          resp: JSON.stringify({
                                message: "Departamentos consultados com sucesso.",
                                data: result.data
                              })
                        });      
        } else {
          var message = 'Erro ao realizar a busca com a requisicao id='+ req.params.id +'.';
          console.log(message)
          return res.status(HttpStatus.BAD_REQUEST)
                    .json({
                            resp: JSON.stringify({
                                  message: message,
                                  data: result.data
                                })
                          });
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
          return res.json({
                          resp: JSON.stringify({
                                message: "Serviços consultados com sucesso.",
                                data: result.data
                              })
                        });      
        } else {
          var message = 'Erro ao realizar a busca com a requisicao id='+ req.params.id +'.';
          console.log(message)
          return res.status(HttpStatus.BAD_REQUEST)
                    .json({
                            resp: JSON.stringify({
                                  message: message,
                                  data: result.data
                                })
                          });
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
          return res.json({
                          resp: JSON.stringify({
                                message: "Anexos consultados com sucesso.",
                                data: result.data
                              })
                        });      
        } else {
          var message = 'Erro ao realizar a busca com a requisicao id='+ req.params.id +'.';
          console.log(message)
          return res.status(HttpStatus.BAD_REQUEST)
                    .json({
                            resp: JSON.stringify({
                                  message: message,
                                  data: result.data
                                })
                          });
        }
    });
  }
}

module.exports = solicitacaoControl;
