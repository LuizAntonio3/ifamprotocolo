var User = require('../models/usuario')
const tokenCtrl = require('../config/token')

var userControl = {
  // /api/v1/usuarios/:id -> um usuario
  findOne: function(req, res, next) {
      console.log('GET /');

      // TODO: check token
      // var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
      // var payload = tokenCtrl.verify(token)
      // if (!payload || typeof payload == 'undefined' || isNaN(payload)) {
      //   console.log("Token invalid")
      //
      //   return res.status(404).json({
      //     msg: "Token is invalid"
      //   })
      // }

      // get one usuario
      User
      .where('id', req.params.id)
      .fetch(/*{
              columns: ['id', 'nome', 'email', 'cpf', 'cod_uni_consumidora']
            }*/)
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

    // check token
    // var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
    // var payload = tokenCtrl.verify(token)
    // if (!payload || typeof payload == 'undefined' || isNaN(payload)) {
    //   console.log("Token invalid")
    //
    //   return res.status(404).json({
    //     msg: "Token invalid"
    //   })
    // }

    // get all usuarios
    User
    .fetchAll(/*{
            columns: ['id', 'nome', 'email', 'cpf', 'cod_uni_consumidora']
          }*/)
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
    // {"nome":"xyz", "cod_uni_consumidora":"123","senha":"xyz", "email": "robson.rojas@gmail.com", "cpf": "822"}
    console.log(req.body);

    var data = {
      nome: req.body.nome,
      // encrypt password
      //senha: tokenCtrl.generate(req.body.senha) TODO:
      senha: req.body.senha,
      email: req.body.email,
      id_company_func: req.body.id_company_func
    }

    console.log(data)

    // Create user
    new User(data)
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
          // token:tokenCtrl.generate(usr),
          //resp: 'success'
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

    // TODO: check token
    // var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
    // var payload = tokenCtrl.verify(token)
    // if (!payload || typeof payload == 'undefined' || isNaN(payload)) {
    //   console.log("Token invalid")
    //
    //   return res.status(404).json({
    //     msg: "Token invalid"
    //   })
    // }

    // logout success
    return res.json({
      msg: 'success'
    });
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /update');
    // .where('id', req.params.id)

    // TODO: check if usr_denuncia already exists
    // TODO: validate parameters

    // parse body data
    // {"tag":"xyz", "descricao":"123"}
    console.log(req.body);
    console.log(req.params);

    var data = {
      nome: req.body.nome,
      senha: req.body.senha,
      email: req.body.email,
      id_company_func: req.body.id_company_func
      };

    // TODO: check if user exists

    // TODO: check if fraude exists
    /*
    {
    	"id_usuario": 1,
        "id_fraude": 1,
        "time": 5.02,
        "longitude": 5.09,
        "latitude": 9.50,
        "status": 0
    }
    */

    // Update
    new User({id: req.params.id})
    .save(data, {patch: true})
    .then(function (usu) {
      return res.json({
        resp: JSON.stringify(usu)
      });
    }).catch(function(error) {
      console.log(error)
      return res.status(400)
    })
  },
/* delete */
  delete: function(req, res, next) {
    console.log('DELETE /usuario');
    // .where('id', req.params.id)

    // TODO: check if usr_denuncia already exists
    // TODO: validate parameters

    // parse body data
    // {"tag":"xyz", "descricao":"123"}
    console.log(req.body);
    console.log(req.params);
    

    // TODO: check if user exists

    // TODO: check if fraude exists
    /*
    {
    	"id_usuario": 1,
        "id_fraude": 1,
        "time": 5.02,
        "longitude": 5.09,
        "latitude": 9.50,
        "status": 0
    }
    */

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
