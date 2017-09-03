var request = require('superagent');

const url = "http://localhost:3000";

const servico = {
	listAll: function (next) {
		request
		.get(url + "/api/v1/servico")
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
						console.log("servicos",resp);

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
	},
	searchByName: function (name, next) {
		request
		.get(url + "/api/v1/servico/search/" + name)
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
						console.log("servicos",resp);

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
	create: function (servico, next) {
		if (servico) {
			if(servico.nome && servico.nome.length === 0) 
				next({success: false, msg: "O campo Nome é obrigatório."});

			// Salvando
			request
			.post(url + "/api/v1/servico")
			.send(servico)
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
							console.log("servicos",resp);

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
	}  
}

module.exports = servico;
