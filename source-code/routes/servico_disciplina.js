var express = require('express');
var router = express.Router();

var _servico_disciplina = require('../controllers/servico_disciplina')

/* GET _servico_disciplinas listing. */
router.get('/', _servico_disciplina.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _servico_disciplina.listRange);

router.get('/:id([0-9]+)', _servico_disciplina.findOne);

//update
router.put('/:id([0-9]+)', _servico_disciplina.update);

// create
router.post('/', _servico_disciplina.create);

//delete
router.delete('/:id([0-9]+)', _servico_disciplina.delete);

module.exports = router;
