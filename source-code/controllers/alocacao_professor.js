var _alocacao_professor = require('../models/alocacao_professor')
var _api = require('./api')

var _alocacao_professorControl = {
  listAll: function(req, res, next) {
    console.log('GET /alocacao_professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);


    // get all alocacao_professors
    _alocacao_professor
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      console.log("models")
      console.log(models);
      _api.handleSuccess(models, res)
    })
    .catch(function(error) {
      console.log("error")
      console.log(error)
      _api.handleException(error, res)
    })
  },

/* create */
  create: function(req, res, next) {
    console.log('POST /alocacao_professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check if _alocacao_professor already exists

    // Create _alocacao_professor
    new _alocacao_professor({
      createdAt: new Date().toISOString(),
      nome: req.body.nome,
      tipo: req.body.tipo,
      email: req.body.email,
      senha: req.body.senha,
      telefone: req.body.telefone,
      matricula: req.body.matricula,
      logradouro: req.body.logradouro,
      numero: req.body.numero,
      bairro: req.body.bairro,
      complemento: req.body.complemento
    })
    .save()
    .then(function (usu) {
      _api.handleSuccess(models, res)
    }).catch(function(error) {
      console.log(error)
      _api.handleException(error, res)
    })
  },

/* login*/
  login: function(req, res, next) {
    console.log('POST /login');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check _alocacao_professor data
    if (!req.body) {
      console.log("Invalid request")
      _api.handleInvalidRequest(req.body, res)
    }

    var email = req.body.email
    var senha = req.body.senha

    if (!email || !senha) {
      console.log("Invalid credentials")
      _api.handleInvalidRequest(req.body, res)      
    }

    _alocacao_professor
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(usr) {
      if (usr) {
        console.log("_alocacao_professor found")
        _api.handleSuccess(usr, res)
      }
      else {
        console.log("alocacao_professor not found")
        _api.handleNotFound(usr, res)
      }

    }).catch(function(error) {
      console.log("Exception: "+error)
      _api.handleException(error, res)
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /update');
    console.log(req.body);
    console.log(req.params);

    // Update
    _alocacao_professor
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (_alocacao_professor) {

      // not founded?
      if(_alocacao_professor == null){
        _api.handleNotFound(_alocacao_professor, res)
      }

      _alocacao_professor.save({
        nome: req.body.nome  || _alocacao_professor.get('nome'),
        tipo: req.body.tipo  || _alocacao_professor.get('tipo'),
        email: req.body.email || _alocacao_professor.get('email'),
        senha: req.body.senha  || _alocacao_professor.get('senha'),
        telefone: req.body.telefone  || _alocacao_professor.get('telefone'),
        matricula: req.body.matricula  || _alocacao_professor.get('matricula'),
        logradouro: req.body.logradouro  || _alocacao_professor.get('logradouro'),
        numero: req.body.numero  || _alocacao_professor.get('numero'),
        bairro: req.body.bairro  || _alocacao_professor.get('bairro'),
        complemento: req.body.complemento  || _alocacao_professor.get('complemento'),
        createdAt: _alocacao_professor.get('createdAt'),
        updatedAt: new Date().toISOString()
      })
      .then(function (usr) {
        _api.handleSuccess(model, res)
      })
      .catch(function (error) {
        _api.handleException(error, res)
      });
    })
    .catch(function (error) {
      _api.handleException(error, res)
    });
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /alocacao_professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    
    // TODO: check if _alocacao_professor exists
    
    // destroy
    _alocacao_professor
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        _api.handleNotFound(model, res)
      }
      
      model
      .save({
        nome: req.body.nome  || model.get('nome'),
        tipo: req.body.tipo  || model.get('tipo'),
        email: req.body.email || model.get('email'),
        senha: req.body.senha  || model.get('senha'),
        telefone: req.body.telefone  || model.get('telefone'),
        matricula: req.body.matricula  || model.get('matricula'),
        logradouro: req.body.logradouro  || model.get('logradouro'),
        numero: req.body.numero  || model.get('numero'),
        bairro: req.body.bairro  || model.get('bairro'),
        complemento: req.body.complemento  || model.get('complemento'),
        createdAt: model.get('createdAt'),
        updatedAt: new Date().toISOString(),
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
  // /api/v1/alocacao_professors/:id -> um alocacao_professor
  findOne: function(req, res, next) {
      console.log('GET /');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);
      console.log(req.decoded);
      
      // get one alocacao_professor
      _alocacao_professor
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
      console.log('GET /alocacao_professor/:offset/:limit');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);

      var offset = parseInt(req.params.offset, 10);
      var limit = parseInt(req.params.limit, 10);


      // get one 
      _alocacao_professor
      .query(function(qb) {
        qb
        .offset(offset)
        .limit(limit);
      })
      .fetchAll()
      .then(function(models) {
        //console.log(models);
        _api.handleSuccess(models, res)
      })
      .catch(function(error) {
        //console.log(error);
        _api.handleException(error, res)
      })
    }

}

module.exports = _alocacao_professorControl;
