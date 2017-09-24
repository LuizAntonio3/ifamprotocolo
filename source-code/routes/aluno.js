var express = require('express');
var router = express.Router();

var _aluno = require('../controllers/aluno')

/* GET _alunos listing. */
router.get('/', _aluno.listAll);

router.get('/:id([0-9]+)', _aluno.findOne);

router.get('/search/:nome([a-z]+)', _aluno.listByName);

router.get('/search/:offset([0-9]+)/:limit([0-9]+)', _aluno.listRange);

//update
router.put('/:id([0-9]+)', _aluno.update);

// create
router.post('/', _aluno.create);

// login
router.post('/login', _aluno.login);

//delete
router.delete('/:id([0-9]+)', _aluno.delete);

module.exports = router;
