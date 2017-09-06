var HttpStatus = require('http-status-codes');
var _solicitacao = require('../models/solicitacao')
var _departamento_solicitacao = require('../models/departamento_solicitacao')
var _servico_solicitacao = require('../models/servico_solicitacao')
var _anexo = require('../models/anexo')

var solicitacaoControl = {
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
      return res.json({
        resp: JSON.stringify(models)
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
                                                                      message: message,
                                                                      code: 1000
                                                                    })
                                                              });
    }

    if (req.body.id_usuario <= 0) {
      var message = "Usuário não informado";
      console.log(message)
      
      return res.status(HttpStatus.BAD_REQUEST).json({
                                                                resp: JSON.stringify({
                                                                      message: message,
                                                                      code: 1000
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
      
      return res.status(HttpStatus.BAD_REQUEST).json({
                                                                resp: JSON.stringify({
                                                                      message: message,
                                                                      code: 1000
                                                                    })
                                                              });
    }

    if (servicos.length == 0) {
      var message = "Serviços não informados";
      console.log(message)
      
      return res.status(HttpStatus.BAD_REQUEST).json({
                                                                resp: JSON.stringify({
                                                                      message: message,
                                                                      code: 1000
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
                                                                          message: message,
                                                                          code: 1000
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
                                                                          message: message,
                                                                          code: 1000
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
                                message: message,
                                code: 1000,
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
                                                                          code: 1000,
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
                                                                      code: 1000,
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

    // update
    _solicitacao
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
        status: req.body.status || model.get('status'),
        id_servico: req.body.id_servico || model.get('id_servico'),
        id_usuario: req.body.id_usuario || model.get('id_usuario'),
        id_departamento: req.body.id_departamento || model.get('id_departamento'),
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
}

module.exports = solicitacaoControl;
