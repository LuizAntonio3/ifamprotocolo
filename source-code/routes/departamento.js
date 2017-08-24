var express = require('express');
var router = express.Router();

var _departamento = require('../controllers/departamento')

/* GET _departamentos listing. */
router.get('/', _departamento.listAll);

router.get('/:offset/:limit', _departamento.listRange);

router.get('/:id', _departamento.findOne);

//update
router.put('/:id', _departamento.update);

// create
router.post('/', _departamento.create);

//delete
router.delete('/:id', _departamento.delete);

module.exports = router;
