var express = require('express');
var router = express.Router();
var _disciplina = require('../controllers/disciplina')

/* GET _disciplinas listing. */
router.get('/', _disciplina.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _disciplina.listRange);

router.get('/:id([0-9]+)', _disciplina.findOne);

//update
router.put('/:id([0-9]+)', _disciplina.update);

// create
router.post('/', _disciplina.create);

//delete
router.delete('/:id([0-9]+)', _disciplina.delete);

module.exports = router;
