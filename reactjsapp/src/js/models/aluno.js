var _api = require('./model')

var request = require('superagent');

const url = "http://localhost:3000";

const aluno = {
	listAll: function (next) {
		_api.listAll("/api/v1/aluno", next)
	},
	searchByName: function (name, next) {
		_api.searchByName("/api/v1/aluno/search/", name, next)
	},
	create: function (aluno, next) {
		if (aluno) {
			if(aluno.nome && aluno.nome.length === 0) 
				next({success: false, msg: "O campo Nome é obrigatório."});
			if(aluno.email && aluno.email.length === 0) 
				next({success: false, msg: "O campo Email é obrigatório."});
			if(aluno.senha && aluno.senha.length === 0) 
				next({success: false, msg: "O campo Senha é obrigatório."});
			if(aluno.telefone && aluno.telefone.length === 0) 
				next({success: false, msg: "O campo Telefone é obrigatório."});
			if(aluno.matricula && aluno.matricula.length === 0) 
				next({success: false, msg: "O campo Matricula é obrigatório."});
			if(aluno.cpf && aluno.cpf.length === 0) 
				next({success: false, msg: "O campo Cpf é obrigatório."});
			if(aluno.logradouro && aluno.logradouro.length === 0) 
				next({success: false, msg: "O campo Logradouro é obrigatório."});
			if(aluno.numero && aluno.numero.length === 0) 
				next({success: false, msg: "O campo Numero é obrigatório."});
			if(aluno.bairro && aluno.bairro.length === 0) 
				next({success: false, msg: "O campo Bairro é obrigatório."});
			if(aluno.complemento && aluno.complemento.length === 0) 
				next({success: false, msg: "O campo Complemento é obrigatório."});
			if(aluno.id_turma && aluno.id_turma.length === 0) 
				next({success: false, msg: "O campo Turma é obrigatório."});

			// Salvando
			_api.create(aluno, "/api/v1/aluno", next);			
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	login: function(vLogin, vSenha, next){

		next({success: true, msg: "Login Realizado com sucesso.", data: null});	

		console.log("aqui");

		if (vLogin.length === 0) { // Aqui eu verifico se digitou algo no login
			next({success: false, msg: "O campo Email é Obrigatório."});
			return;
		} else if (vSenha.length === 0) { // Aqui eu verifico se digitou algo no login
			next({success: false, msg: "O campo Senha é Obrigatório."});
			return;
		}

		request
		.post(url + "/api/v1/aluno/login")
		.send({
					email: vLogin, 
					senha: vSenha
				})
		.set('Accept', 'application/json')
		.end(function(err, res){

			if (res) {
				if (res.text) {
					try {
						
						var obj = JSON.parse(res.text);
						console.log("dados",obj);
						var resp = JSON.parse(obj.resp);
						console.log("alunos",resp);

						if (err || !res.ok) {
							next({success: false, msg: "Resposta inválida do servidor.", data: resp});
						} else {
							next({success: true, msg: "", data: resp});
						}				
					} catch (error) {
						next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
					}
				} else {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
				}
			} else {
				next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
			}
		});
	}  
}

module.exports = aluno;
