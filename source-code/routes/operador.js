var express = require('express');
var router = express.Router();
var _operador = require('../controllers/operador')

/* GET _operadors listing. */
router.get('/', _operador.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _operador.listRange);

router.get('/:id([0-9]+)', _operador.findOne);

//update
router.put('/:id([0-9]+)', _operador.update);

// create
router.post('/', _operador.create);

//delete
router.delete('/:id([0-9]+)', _operador.delete);

module.exports = router;
