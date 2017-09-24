var express = require('express');
var router = express.Router();

var _turma = require('../controllers/turma')

/* GET _turmas listing. */
router.get('/', _turma.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _turma.listRange);
router.get('/:id([0-9]+)', _turma.findOne);

//update
router.put('/:id([0-9]+)', _turma.update);

// create
router.post('/', _turma.create);

//delete
router.delete('/:id([0-9]+)', _turma.delete);

module.exports = router;
