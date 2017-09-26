var express = require('express');
var router = express.Router();
var _anexo = require('../controllers/anexo')
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      var filename = Date.now() + '_' + file.originalname;
    cb(null, filename)
  }
})

const upload = multer({ storage: storage });

/* GET _anexos listing. */
router.get('/', _anexo.listAll);

router.post('/upload', upload.single('file'), _anexo.upload);

router.get('/:offset([0-9]+)/:limit([0-9]+)', _anexo.listRange);

router.get('/:id([0-9]+)', _anexo.findOne);

//update
router.put('/:id([0-9]+)', _anexo.update);

// create
router.post('/', _anexo.create);

//delete
router.delete('/:id([0-9]+)', _anexo.delete);

module.exports = router;
