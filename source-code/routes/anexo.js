var express = require('express');
var router = express.Router();

var _anexo = require('../controllers/anexo')

/* GET _anexos listing. */
router.get('/', _anexo.listAll);

router.get('/:id', _anexo.findOne);

//update
router.put('/:id', _anexo.update);

// create
router.post('/', _anexo.create);

//delete
router.delete('/:id', _anexo.delete);

module.exports = router;
