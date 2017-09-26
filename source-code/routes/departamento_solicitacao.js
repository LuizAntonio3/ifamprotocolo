var express = require('express');
var router = express.Router();
var _departamento_solicitacao = require('../controllers/departamento_solicitacao')

/* GET _departamento_solicitacaos listing. */
router.get('/', _departamento_solicitacao.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _departamento_solicitacao.listRange);

router.get('/:id([0-9]+)', _departamento_solicitacao.findOne);

//update
router.put('/:id([0-9]+)', _departamento_solicitacao.update);

// create
router.post('/', _departamento_solicitacao.create);

//delete
router.delete('/:id([0-9]+)', _departamento_solicitacao.delete);

module.exports = router;
