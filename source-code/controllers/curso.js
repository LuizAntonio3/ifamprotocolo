var _curso = require('../models/curso')

var cursoControl = {
/*list all*/
  listAll: function(req, res, next) {
    console.log('GET /curso');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(req.decoded);

    // get all
    _curso
    .where('deletedAt', null)
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
/* create */
  create: function(req, res, next) {
    console.log('POST /curso');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // parse body data
    var data = {
      createdAt: new Date().toISOString(),
      caminho: req.body.caminho,
      id_solicitacao: req.body.id_solicitacao
      };

    // TODO: check if already exists

    // Create 
    new _curso(data)
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
/* upload */
  upload: function(req, res, next) {
    console.log('POST /upload');
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);

    console.log(req.params);
    console.log(req.query);

   res.status(200).send({
      resp: JSON.stringify({
        originalname: req.file.originalname, 
        newname: req.file.filename
      })
    });
   res.end();
  },
/* update */
  update: function(req, res, next) {
    console.log('PUT /curso');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // TODO: validate parameters

    // update
    _curso
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
        caminho: req.body.caminho || model.get('caminho'),
        id_solicitacao: req.body.id_solicitacao || model.get('id_solicitacao'),
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
    console.log('DELETE /curso');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    _curso
    .where('id', req.params.id)
    .fetch()
    .then(function (model) {

      // not founded?
      if(model == null){
        return res.status(404).json();
      }
      
      model
      .save({
        caminho: req.body.caminho || model.get('caminho'),
        id_solicitacao: req.body.id_solicitacao || model.get('id_solicitacao'),
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
    console.log('GET /curso/:id');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get one 
    _curso
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
    console.log('GET /curso/:offset/:limit');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    // get range
    _curso
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

module.exports = cursoControl;
