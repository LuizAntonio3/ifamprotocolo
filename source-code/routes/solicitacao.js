var express = require('express');
var router = express.Router();

var _solicitacao = require('../controllers/solicitacao')

/* GET _solicitacaos listing. */
router.get('/', _solicitacao.listAll);

router.get('/:id', _solicitacao.findOne);

//update
router.put('/:id', _solicitacao.update);

// create
router.post('/', _solicitacao.create);

//delete
router.delete('/:id', _solicitacao.delete);

module.exports = router;
