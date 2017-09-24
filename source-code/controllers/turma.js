var _turma = require('../models/turma')

var _turmaControl = {
  listByName: function(req, res, next) {
    console.log('GET /turma/:nome');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);


    // get all turmas
    _turma
    .query(function(qb) {
      qb
      .select('id', 'nome')
      .whereNull('deletedAt')
      .where('nome', 'like', req.params.nome+'%')

    })
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      return res.json({
        resp: JSON.stringify(models)
      });
    })
    .catch(function(error) {
      return res.status(404).json()
    })
  },

  listAll: function(req, res, next) {
    console.log('GET /turma');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);


    // get all turmas
    _turma
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      console.log("models")
      console.log(models);
      return res.json({
        resp: JSON.stringify(models)
      });
    })
    .catch(function(error) {
      console.log("error")
      console.log(error)
      return res.status(404).json()
    })
  },

/* create */
  create: function(req, res, next) {
    console.log('POST /turma');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check if _turma already exists

    // Create _turma
    new _turma({
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
      return res.json({
        resp: JSON.stringify(usu)
      });
    }).catch(function(error) {
      console.log(error)
      return res.status(404).json()
    })
  },

/* login*/
  login: function(req, res, next) {
    console.log('POST /login');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check _turma data
    if (!req.body) {
      console.log("Invalid request")
      return res.status(400)
    }

    var email = req.body.email
    var senha = req.body.senha

    if (!email || !senha) {
      console.log("Invalid credentials")
      return res.status(400).json()
    }

    _turma
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(usr) {
      if (usr) {
        console.log("_turma found")
        return res.json({
          resp: JSON.stringify(usr)
        });
      }
      else {
        console.log("turma not found")
        return res.status(404).json({});
      }

    }).catch(function(error) {
      console.log("Exception: "+error)
      return res.status(400).json()
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /update');
    console.log(req.body);
    console.log(req.params);

    // Update
    _turma
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (_turma) {

      // not founded?
      if(_turma == null){
        return res.status(404).json();
      }

      _turma.save({
        nome: req.body.nome  || _turma.get('nome'),
        tipo: req.body.tipo  || _turma.get('tipo'),
        email: req.body.email || _turma.get('email'),
        senha: req.body.senha  || _turma.get('senha'),
        telefone: req.body.telefone  || _turma.get('telefone'),
        matricula: req.body.matricula  || _turma.get('matricula'),
        logradouro: req.body.logradouro  || _turma.get('logradouro'),
        numero: req.body.numero  || _turma.get('numero'),
        bairro: req.body.bairro  || _turma.get('bairro'),
        complemento: req.body.complemento  || _turma.get('complemento'),
        createdAt: _turma.get('createdAt'),
        updatedAt: new Date().toISOString()
      })
      .then(function (usr) {
        res.json({
          resp: JSON.stringify(usr)
        });
      })
      .catch(function (err) {
        res.status(400).json()
      });
    })
    .catch(function (err) {
      res.status(404).json()
    });
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /turma');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    
    // TODO: check if _turma exists
    
    // destroy
    _turma
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        return res.status(404).json();
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
  // /api/v1/turmas/:id -> um turma
  findOne: function(req, res, next) {
      console.log('GET /');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);
      console.log(req.decoded);
      
      // get one turma
      _turma
      .where('id', req.params.id)
      .where('deletedAt', null)
      .fetch()
      .then(function(usr) {
        if (usr) {
          return res.json({
            resp: JSON.stringify(usr)
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
      console.log('GET /turma/:offset/:limit');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);

      var offset = parseInt(req.params.offset, 10);
      var limit = parseInt(req.params.limit, 10);


      // get one 
      _turma
      .query(function(qb) {
        qb
        .offset(offset)
        .limit(limit);
      })
      .fetchAll()
      .then(function(models) {
        //console.log(models);
        return res.json({
          resp: JSON.stringify(models)
        });
      })
      .catch(function(error) {
        //console.log(error);
        return res.status(400).json()
      })
    }

}

module.exports = _turmaControl;
