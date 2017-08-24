var express = require('express');
var router = express.Router();

var _servico_departamento = require('../controllers/servico_departamento')

/* GET _servico_departamentos listing. */
router.get('/', _servico_departamento.listAll);

router.get('/:offset/:limit', _servico_departamento.listRange);

router.get('/:id', _servico_departamento.findOne);

//update
router.put('/:id', _servico_departamento.update);

// create
router.post('/', _servico_departamento.create);

//delete
router.delete('/:id', _servico_departamento.delete);

module.exports = router;
