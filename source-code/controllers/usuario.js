var _usuario = require('../models/usuario')

var _usuarioControl = {
  listAll: function(req, res, next) {
    console.log('GET /usuario');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all usuarios
    _usuario
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

/* create */
  create: function(req, res, next) {
    console.log('POST /usuario');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: check if _usuario already exists

    // Create _usuario
    new _usuario({
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

    // TODO: check _usuario data
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

    _usuario
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(usr) {
      if (usr) {
        console.log("_usuario found")
        return res.json({
          resp: JSON.stringify(usr)
        });
      }
      else {
        console.log("usuario not found")
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
    _usuario
    .where('id', req.params.id)
    .where('deletedAt', null)
    .fetch()
    .then(function (_usuario) {

      // not founded?
      if(_usuario == null){
        return res.status(404).json();
      }

      _usuario.save({
        nome: req.body.nome  || _usuario.get('nome'),
        tipo: req.body.tipo  || _usuario.get('tipo'),
        email: req.body.email || _usuario.get('email'),
        senha: req.body.senha  || _usuario.get('senha'),
        telefone: req.body.telefone  || _usuario.get('telefone'),
        matricula: req.body.matricula  || _usuario.get('matricula'),
        logradouro: req.body.logradouro  || _usuario.get('logradouro'),
        numero: req.body.numero  || _usuario.get('numero'),
        bairro: req.body.bairro  || _usuario.get('bairro'),
        complemento: req.body.complemento  || _usuario.get('complemento'),
        createdAt: _usuario.get('createdAt'),
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
    console.log('DELETE /usuario');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    
    // TODO: check if _usuario exists
    
    // destroy
    _usuario
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
  // /api/v1/usuarios/:id -> um usuario
  findOne: function(req, res, next) {
      console.log('GET /');
      console.log(req.body);
      console.log(req.params);
      console.log(req.query);
      console.log(req.decoded);
      
      // get one usuario
      _usuario
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
    }
}

module.exports = _usuarioControl;
