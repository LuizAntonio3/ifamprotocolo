var User = require('../models/usuario')

var userControl = {
  // /api/v1/usuarios/:id -> um usuario
  findOne: function(req, res, next) {
      console.log('GET /');

      // get one usuario
      User
      .where('id', req.params.id)
      .fetch()
      .then(function(usr) {
        if (usr) {
          return res.json({
            resp: JSON.stringify(usr)
          });
        }
        else {
          return res.status(404)
        }
      })
      .catch(function(error) {
        console.log(error)
        return res.status(400)
      })
    },

  listAll: function(req, res, next) {
    console.log('GET /listAll');

    // get all usuarios
    User
    .fetchAll()
    .then(function(usuarios) {
      return res.json({
        resp: JSON.stringify(usuarios)
      });
    })
    .catch(function(error) {
      return res.status(404)
    })
  },

/* create */
  create: function(req, res, next) {
    console.log('POST /create');

    // TODO: check if user already exists

    // parse body data
    console.log(req.body);

    // Create user
    new User({
      nome: req.body.nome,
      matricula: req.body.matricula,
      email: req.body.email,
      senha: req.body.senha
    })
    .save()
    .then(function (usu) {
      return res.json({
        resp: JSON.stringify(usu)
      });
    }).catch(function(error) {
      console.log(error)
      return res.status(400)
    })
  },

/* login*/
  login: function(req, res, next) {
    console.log('POST /login');

    // TODO: check user data
    if (!req.body) {
      console.log("Invalid request")
      return res.status(400)
    }

    console.log(req.body);

    var email = req.body.email
    var senha = req.body.senha

    if (!email || !senha) {
      console.log("Invalid credentials")
      return res.status(400)
    }

    User
    .where('email', email)
    .where('senha', senha)
    .fetch()
    .then(function(usr) {
      if (usr) {
        console.log("User found")
        return res.json({
          resp: JSON.stringify(usr)
        });
      }
      else {
        console.log("User not found")
        return res.status(404)
      }

    }).catch(function(error) {
      console.log("Exception: "+error)
      return res.status(400)
    })
  },

  /* logout*/
  logout: function(req, res, next) {
    console.log('POST /logout');
    console.log(req.body)

    // logout success
    return res.json({
      msg: 'success'
    });
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /update');
    console.log(req.body);
    console.log(req.params);

    // Update
    User
    .forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
    
      user.save({
        nome: req.body.nome  || user.get('nome'),
        senha: req.body.senha || user.get('senha'),
        email: req.body.email  || user.get('email'),
        matricula: req.body.matricula  || user.get('matricula')
      })
      .then(function (usr) {
        res.json({
          resp: JSON.stringify(usr)
        });
      })
      .catch(function (err) {
        res.status(400);
      });
    })
    .catch(function (err) {
      res.status(400);
    });
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /usuario');
    
    console.log(req.body);
    console.log(req.params);
    
    // TODO: check if user exists

    // TODO: check if fraude exists
    
    // destroy
    new User({id: req.params.id})
    .destroy()
    .then(function (usu) {
      return res.json({
        resp: JSON.stringify(usu)
      });
    }).catch(function(error) {
      console.log(error)
      return res.status(400)
    })
  }
}

module.exports = userControl;
