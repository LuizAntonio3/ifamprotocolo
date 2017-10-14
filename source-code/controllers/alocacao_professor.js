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
      id_professor: req.body.id_professor,
      id_disciplina: req.body.id_disciplina,
      id_turma: req.body.id_turma
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
        id_professor: req.body.id_professor ||  _alocacao_professor.get('id_professor'),
        id_disciplina: req.body.id_disciplina ||  _alocacao_professor.get('id_disciplina'),
        id_turma: req.body.id_turma ||  _alocacao_professor.get('id_turma'),
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
        id_professor: req.body.id_professor ||  _alocacao_professor.get('id_professor'),
        id_disciplina: req.body.id_disciplina ||  _alocacao_professor.get('id_disciplina'),
        id_turma: req.body.id_turma ||  _alocacao_professor.get('id_turma'),
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
