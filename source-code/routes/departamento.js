var express = require('express');
var router = express.Router();
var _departamento = require('../controllers/departamento')

/* GET _departamentos listing. */
router.get('/', _departamento.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _departamento.listRange);

router.get('/:id([0-9]+)', _departamento.findOne);

//update
router.put('/:id([0-9]+)', _departamento.update);

// create
router.post('/', _departamento.create);

//delete
router.delete('/:id([0-9]+)', _departamento.delete);

module.exports = router;
