var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

var usuario = require('./routes/usuario');
var anexo = require('./routes/anexo');
var departamento = require('./routes/departamento');
var servico_departamento = require('./routes/servico_departamento');
var servico = require('./routes/servico');
var solicitacao = require('./routes/solicitacao');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/usuario', usuario);
app.use('/api/v1/anexo', anexo);
app.use('/api/v1/departamento', departamento);
app.use('/api/v1/servico_departamento', servico_departamento);
app.use('/api/v1/servico', servico);
app.use('/api/v1/solicitacao', solicitacao);

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
