var express = require('express');
var router = express.Router();

var _alocacao_professor = require('../controllers/alocacao_professor')

/* GET _alocacao_professors listing. */
router.get('/', _alocacao_professor.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _alocacao_professor.listRange);
router.get('/:id([0-9]+)', _alocacao_professor.findOne);

//update
router.put('/:id([0-9]+)', _alocacao_professor.update);

// create
router.post('/', _alocacao_professor.create);

//delete
router.delete('/:id([0-9]+)', _alocacao_professor.delete);

module.exports = router;
