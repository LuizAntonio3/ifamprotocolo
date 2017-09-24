var request = require('superagent');

const url = "http://localhost:3000";

const anexo = {
	listAll: function (next) {
		request
		.get(url + "/api/v1/anexo")
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
						console.log("anexos",resp);

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
	upload: function (anexo, next) {
		console.log('anexo', anexo)
		
		if (anexo) {

        request
		.post('http://localhost:3000/api/v1/anexo/upload')
		.attach('file',anexo)
		.end(function(err, res){
				console.log(err);
				console.log(res);
				if (res) {
					if (res.text) {
						try {
							
							var obj = JSON.parse(res.text);
							console.log("dados",obj);
							var resp = JSON.parse(obj.resp);
							console.log("anexos",resp);

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

module.exports = anexo;
