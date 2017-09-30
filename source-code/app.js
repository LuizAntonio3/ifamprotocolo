var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

var aluno = require('./routes/aluno');
var anexo = require('./routes/anexo');
var curso = require('./routes/curso');
var departamento_solicitacao = require('./routes/departamento_solicitacao');
var departamento = require('./routes/departamento');
var disciplina = require('./routes/disciplina');
var operador = require('./routes/operador');
var professor = require('./routes/professor');
var responsavel_departamento = require('./routes/responsavel_departamento');
var servico_departamento = require('./routes/servico_departamento');
var servico_disciplina = require('./routes/servico_disciplina');
var servico_solicitacao = require('./routes/servico_solicitacao');
var servico = require('./routes/servico');
var solicitacao = require('./routes/solicitacao');
var turma = require('./routes/turma');
var alocacao_professor = require('./routes/alocacao_professor');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/operador', operador);
app.use('/api/v1/aluno', aluno);
app.use('/api/v1/anexo', anexo);
app.use('/api/v1/curso', curso);
app.use('/api/v1/departamento_solicitacao', departamento_solicitacao);
app.use('/api/v1/alocacao_professor', alocacao_professor);
app.use('/api/v1/departamento', departamento);
app.use('/api/v1/disciplina', disciplina);
app.use('/api/v1/professor', professor);
app.use('/api/v1/responsavel_departamento', responsavel_departamento);
app.use('/api/v1/servico_departamento', servico_departamento);
app.use('/api/v1/servico_disciplina', servico_disciplina);
app.use('/api/v1/servico_solicitacao', servico_solicitacao);
app.use('/api/v1/servico', servico);
app.use('/api/v1/requisicao', solicitacao);
app.use('/api/v1/turma', turma);

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
