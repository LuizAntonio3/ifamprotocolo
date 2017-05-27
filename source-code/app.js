var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var usuario = require('./routes/usuario');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/usuario', usuario);

// static
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
