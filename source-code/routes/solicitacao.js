var express = require('express');
var router = express.Router();

var _solicitacao = require('../controllers/solicitacao')

/* GET _solicitacaos listing. */
router.get('/', _solicitacao.listAll);

router.get('/:id([0-9]+)/departamento', _solicitacao.findDepartamentos);
router.get('/:id([0-9]+)/servico', _solicitacao.findServicos);
router.get('/:id([0-9]+)/anexo', _solicitacao.findAnexos);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _solicitacao.listRange);

router.get('/:id([0-9]+)', _solicitacao.findOne);

//update
router.put('/:id([0-9]+)', _solicitacao.update);

// create
router.post('/', _solicitacao.create);

//delete
router.delete('/:id([0-9]+)', _solicitacao.delete);

module.exports = router;
