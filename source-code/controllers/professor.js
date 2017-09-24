var _professor = require('../models/professor')

var professorControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all
    _professor
    .where('deletedAt', null)
    .fetchAll()
    .then(function(models) {
      console.log(models)
      return res.json({
        resp: JSON.stringify(models)
      });
    })
    .catch(function(error) {
      return res.status(400).json()
    })
  },
/* create */
  create: function(req, res, next) {
    console.log('POST /professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // parse body data
    var data = {
      createdAt: new Date().toISOString(),
      nome: req.body.nome
      };

    // TODO: check if already exists

    // Create 
    new _professor(data)
    .save()
    .then(function (model) {
      return res.json({
        resp: JSON.stringify(model)
      });
    }).catch(function(error) {
      console.log(error)
      return res.status(400).json()
    })
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _professor
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
        nome: req.body.nome || model.get('nome'),
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
    console.log('DELETE /professor');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _professor
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        return res.status(404).json();
      }
      
      model
      .save({
        nome: req.body.nome || model.get('nome'),
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
    console.log('GET /professor/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _professor
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
    console.log('GET /professor/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _professor
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
  }
}

module.exports = professorControl;
