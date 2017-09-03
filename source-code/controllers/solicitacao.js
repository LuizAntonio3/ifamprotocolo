var HttpStatus = require('http-status-codes');
var _solicitacao = require('../models/solicitacao')
var _departamento_solicitacao = require('../models/departamento_solicitacao')
var _servico_solicitacao = require('../models/servico_solicitacao')

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
      return res.status(HttpStatus.BAD_REQUEST).json()
    }

    // parse body data
    var data = {
      id_usuario: req.body.id_usuario,
    };
  
    const departamentos = req.body.departamentos;
    const servicos = req.body.servicos;

    // TODO: check if already exists

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
            message: message,
            code: 1000
          })
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
              resp: JSON.stringify(solicitacao)
            });            
          }
        })
        .catch((error) =>{
          console.log(error)
          var message = 'Erro ao vincular a requisição id='+ solicitacao.id +' ao serviço id=' + serv +'.';

          console.log(message)

          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: message,
            code: 1000
          })
        })
      }

    }).catch(function(error) {
      console.log(error)
      return res.status(400).json()
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
