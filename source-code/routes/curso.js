var express = require('express');
var router = express.Router();
var _curso = require('../controllers/curso')

/* GET _cursos listing. */
router.get('/', _curso.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _curso.listRange);

router.get('/:id([0-9]+)', _curso.findOne);

//update
router.put('/:id([0-9]+)', _curso.update);

// create
router.post('/', _curso.create);

//delete
router.delete('/:id([0-9]+)', _curso.delete);

module.exports = router;
