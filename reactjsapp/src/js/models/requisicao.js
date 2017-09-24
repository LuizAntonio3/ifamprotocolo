var _model = require('./model')

const requisicao = {
	listAll: function (next) {
		_model.listAll("/api/v1/requisicao", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/requisicao", id, next);
	},
	searchByName: function (name, next) {
		next({success: false, msg: "Resposta inválida do servidor.", data: null});
	},
	checkData: function (requisicao, next) {
		if (requisicao) {
			if(!requisicao.id_usuario )
					next({success: false, msg: "O campo Usuário ou Matrícula é obrigatório."});
					
			if(!requisicao.servicos || requisicao.servicos.lenght === 0  ){
						next({success: false, msg: "Selecione pelo menos um serviço."});
					}

			if(!requisicao.departamentos || requisicao.departamentos.lenght === 0 ){
						next({success: false, msg: "Selecione pelo menos um departamento."});
					}

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (requisicao, next) {

		this.checkData(requisicao, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(requisicao, "/api/v1/requisicao/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/requisicao/", id, next);
		} else {
			next({success: false, msg: "Item inválido.", data: null})
		}
	},
	update: function (id, data, next) {
		if (!id || id <= 0 ) {
			next({success: false, msg: "Id inválido.", data: null})
		}

		this.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/requisicao/", id, data, next);
	},
	getDepartamentos: function (requisicaoId, next) {
		if (!requisicaoId || requisicaoId <= 0) {
			next({success: false, msg: "Requisicao inválido", data: null})
		}
		
		_model.get("/api/v1/requisicao/" + requisicaoId + "/departamento", next);		
	},
	getServicos: function (requisicaoId, next) {
		if (!requisicaoId || requisicaoId <= 0) {
			next({success: false, msg: "Requisicao inválido", data: null})
		}
		
		_model.get("/api/v1/requisicao/" + requisicaoId + "/servico", next);
	},
	getAnexos: function (requisicaoId, next) {
		if (!requisicaoId || requisicaoId <= 0) {
			next({success: false, msg: "Requisicao inválido", data: null})
		}
		
		_model.get("/api/v1/requisicao/" + requisicaoId + "/anexo", next);
	}
}

module.exports = requisicao;
