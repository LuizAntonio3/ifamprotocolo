var express = require('express');
var router = express.Router();

var _servico = require('../controllers/servico')

/* GET _servicos listing. */
router.get('/', _servico.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _servico.listRange);

router.get('/:id([0-9]+)', _servico.findOne);

//update
router.put('/:id([0-9]+)', _servico.update);

// create
router.post('/', _servico.create);

//delete
router.delete('/:id([0-9]+)', _servico.delete);

module.exports = router;
