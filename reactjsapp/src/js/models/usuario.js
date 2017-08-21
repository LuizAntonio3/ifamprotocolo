var request = require('superagent');

const url = "http://localhost:3000";

const Usuario = {
	login: function(vLogin, vSenha, next){

		console.log("aqui");

		if (vLogin.length === 0) { // Aqui eu verifico se digitou algo no login
			return {success: false, msg: "O campo Email é Obrigatório."};
		} else if (vSenha.length === 0) { // Aqui eu verifico se digitou algo no login
			return {success: false, msg: "O campo Senha é Obrigatório."};
		}

		console.log("aqui");

		request
		.post(url + "/api/v1/usuario/login")
		.send({
					email: vLogin, 
					senha: vSenha
				})
		.set('Accept', 'application/json')
		.end(function(err, res){

			// console.log(err);
			// console.log(res);

			var obj = JSON.parse(res.text);
			console.log(obj);

			if (err || !res.ok) {
				next({success: false, msg: "Resposta inválida do servidor.", data: obj});
				
			} else {
				next({success: true, msg: "Login Realizado com sucesso.", data: obj});

			}
		});
	}
  
}

module.exports = Usuario;
