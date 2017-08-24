var express = require('express');
var router = express.Router();

var _servico = require('../controllers/servico')

/* GET _servicos listing. */
router.get('/', _servico.listAll);

router.get('/:offset/:limit', _servico.listRange);

router.get('/:id', _servico.findOne);

//update
router.put('/:id', _servico.update);

// create
router.post('/', _servico.create);

//delete
router.delete('/:id', _servico.delete);

module.exports = router;
