var express = require('express');
var router = express.Router();

var _usuario = require('../controllers/usuario')

/* GET _usuarios listing. */
router.get('/', _usuario.listAll);

router.get('/:id', _usuario.findOne);

// create
router.post('/', _usuario.create);

// login
router.post('/login', _usuario.login);

//logout
router.post('/logout', _usuario.logout);

//update
router.put('/:id', _usuario.update);

//delete
router.delete('/:id', _usuario.delete);

module.exports = router;
