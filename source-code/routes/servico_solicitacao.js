var express = require('express');
var router = express.Router();

var _servico_solicitacao = require('../controllers/servico_solicitacao')

/* GET _servico_solicitacaos listing. */
router.get('/', _servico_solicitacao.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _servico_solicitacao.listRange);

router.get('/:id([0-9]+)', _servico_solicitacao.findOne);

//update
router.put('/:id([0-9]+)', _servico_solicitacao.update);

// create
router.post('/', _servico_solicitacao.create);

//delete
router.delete('/:id([0-9]+)', _servico_solicitacao.delete);

module.exports = router;
