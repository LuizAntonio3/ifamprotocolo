var request = require('superagent');
var _model = require('./model')

const url = "http://localhost:3000";

const requisicao = {
	listAll: function (next) {
		_model.listAll("/api/v1/requisicao", next);		
	},
	searchByName: function (name, next) {
		next({success: false, msg: "Resposta inválida do servidor.", data: null});
	},
	create: function (requisicao, next) {
		if (requisicao) {
			if(requisicao.nome && requisicao.nome.length === 0) 
				next({success: false, msg: "O campo Nome é obrigatório."});

			// todo: uses _model
			
			// Salvando
			request
			.post(url + "/api/v1/requisicao")
			.send(requisicao)
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
							console.log("requisicaos",resp);

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
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/requisicao/", id, next);
		} else {
			next(null, {success: false, msg: "Item inválido.", data: null})
		}
	}
}

module.exports = requisicao;
