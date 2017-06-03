var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var usuario = require('./routes/usuario');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/usuario', usuario);

// static
app.use(express.static(path.join(__dirname, 'public')));



/**
 * Get port from environment and store in Express.
 */

var port = 3000;
//app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

//module.exports = app;
