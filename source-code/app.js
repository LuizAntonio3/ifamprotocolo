var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var anuncio = require('./routes/anuncio');
var company = require('./routes/company');
var denuncia = require('./routes/denuncia');
var premio = require('./routes/premio');
var status_denuncia = require('./routes/status_denuncia');
var tipo_anuncio = require('./routes/tipo_anuncio');
var tipo_fraude = require('./routes/tipo_fraude');
var usuario = require('./routes/usuario');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/usuario', usuario);

// static
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
