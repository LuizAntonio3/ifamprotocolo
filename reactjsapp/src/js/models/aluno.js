var _api = require('./model')

const aluno_ = {
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

		_api.post("/api/v1/aluno/login", {email: vLogin, senha: vSenha}, next);
	}
}

module.exports = aluno_;
