var express = require('express');
var router = express.Router();

var _responsavel_departamento = require('../controllers/responsavel_departamento')

/* GET _responsavel_departamentos listing. */
router.get('/', _responsavel_departamento.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _responsavel_departamento.listRange);

router.get('/:id([0-9]+)', _responsavel_departamento.findOne);

//update
router.put('/:id([0-9]+)', _responsavel_departamento.update);

// create
router.post('/', _responsavel_departamento.create);

//delete
router.delete('/:id([0-9]+)', _responsavel_departamento.delete);

module.exports = router;
