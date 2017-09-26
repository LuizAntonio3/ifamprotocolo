var _aluno = require('../models/aluno')

var _alunoControl = {
  listByName: function(req, res, next) {
    console.log('GET /aluno/:nome');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);


    // get all alunos
    _aluno
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
    console.log('GET /aluno');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);


    // get all alunos
    _aluno
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
    console.log('POST /aluno');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check if _aluno already exists

    // Create _aluno
    new _aluno({
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

    // TODO: check _aluno data
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

    _aluno
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(usr) {
      if (usr) {
        console.log("_aluno found")
        return res.json({
          resp: JSON.stringify(usr)
        });
      }
      else {
        console.log("aluno not found")
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
    _aluno
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (_aluno) {

      // not founded?
      if(_aluno == null){
        return res.status(404).json();
      }

      _aluno.save({
        nome: req.body.nome  || _aluno.get('nome'),
        tipo: req.body.tipo  || _aluno.get('tipo'),
        email: req.body.email || _aluno.get('email'),
        senha: req.body.senha  || _aluno.get('senha'),
        telefone: req.body.telefone  || _aluno.get('telefone'),
        matricula: req.body.matricula  || _aluno.get('matricula'),
        logradouro: req.body.logradouro  || _aluno.get('logradouro'),
        numero: req.body.numero  || _aluno.get('numero'),
        bairro: req.body.bairro  || _aluno.get('bairro'),
        complemento: req.body.complemento  || _aluno.get('complemento'),
        createdAt: _aluno.get('createdAt'),
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
    console.log('DELETE /aluno');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    
    // TODO: check if _aluno exists
    
    // destroy
    _aluno
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
  // /api/v1/alunos/:id -> um aluno
  findOne: function(req, res, next) {
      console.log('GET /');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);
      console.log(req.decoded);
      
      // get one aluno
      _aluno
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
      console.log('GET /aluno/:offset/:limit');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);

      var offset = parseInt(req.params.offset, 10);
      var limit = parseInt(req.params.limit, 10);


      // get one 
      _aluno
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

module.exports = _alunoControl;
