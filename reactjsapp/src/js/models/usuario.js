var request = require('superagent');

const url = "http://localhost:3000";

const Usuario = {
	listAll: function (next) {
		request
		.get(url + "/api/v1/usuario")
		.set('Accept', 'application/json')
		.end(function(err, res){
			console.log(err);
			console.log("resposta",res);
			if (res) {
				if (res.text) {
					try {
						var obj = JSON.parse(res.text);
						console.log("dados",obj);
						var resp = JSON.parse(obj.resp);
						console.log("usuarios",resp);

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
		})
		// .catch(function (err) {
		// 	console.log(err);
		// 	next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: err});
		// });
	},
	searchByName: function (name, next) {
		request
		.get(url + "/api/v1/usuario/search/" + name)
		.set('Accept', 'application/json')
		.end(function(err, res){
			console.log(err);
			console.log(res);
			if (res) {
				if (res.text) {
					try {
						
						var obj = JSON.parse(res.text);
						console.log("dados",obj);
						var resp = JSON.parse(obj.resp);
						console.log("usuarios",resp);

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
	},
	create: function (usuario, next) {
		if (usuario) {
			if(usuario.nome && usuario.nome.length === 0) 
				next({success: false, msg: "O campo Nome é obrigatório."});
			if(usuario.tipo && usuario.tipo.length === 0) 
				next({success: false, msg: "O campo Tipo é obrigatório."});
			if(usuario.email && usuario.email.length === 0) 
				next({success: false, msg: "O campo Email é obrigatório."});
			if(usuario.senha && usuario.senha.length === 0) 
				next({success: false, msg: "O campo Senha é obrigatório."});
			if(usuario.telefone && usuario.telefone.length === 0) 
				next({success: false, msg: "O campo Telefone é obrigatório."});
			if(usuario.matricula && usuario.matricula.length === 0) 
				next({success: false, msg: "O campo Matricula é obrigatório."});
			if(usuario.logradouro && usuario.logradouro.length === 0) 
				next({success: false, msg: "O campo Logradouro é obrigatório."});
			if(usuario.numero && usuario.numero.length === 0) 
				next({success: false, msg: "O campo Numero é obrigatório."});
			if(usuario.bairro && usuario.bairro.length === 0) 
				next({success: false, msg: "O campo Bairro é obrigatório."});
			if(usuario.complemento && usuario.complemento.length === 0) 
				next({success: false, msg: "O campo Complemento é obrigatório."});

			// Salvando
			request
			.post(url + "/api/v1/usuario")
			.send(usuario)
			.set('Accept', 'application/json')
			.end(function(err, res){
				console.log(err);
				console.log(res);
				if (res) {
					if (res.text) {
						try {
							
							var obj = JSON.parse(res.text);
							console.log("dados",obj);
							var resp = JSON.parse(obj.resp);
							console.log("usuarios",resp);

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
		.post(url + "/api/v1/usuario/login")
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
						console.log("usuarios",resp);

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

module.exports = Usuario;
