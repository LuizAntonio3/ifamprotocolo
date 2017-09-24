var express = require('express');
var router = express.Router();
var _professor = require('../controllers/professor')

/* GET _professors listing. */
router.get('/', _professor.listAll);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _professor.listRange);

router.get('/:id([0-9]+)', _professor.findOne);

//update
router.put('/:id([0-9]+)', _professor.update);

// create
router.post('/', _professor.create);

//delete
router.delete('/:id([0-9]+)', _professor.delete);

module.exports = router;
