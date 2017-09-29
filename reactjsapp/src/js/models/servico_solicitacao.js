var _model = require('./model')

const servico_solicitacao = {
	listAll: function (next) {
		_model.listAll("/api/v1/servico_solicitacao", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/servico_solicitacao", id, next);
	},
	searchByName: function (name, next) {
		next({success: false, msg: "Resposta inválida do servidor.", data: null});
	},
	checkData: function (servico_solicitacao, next) {
		if (servico_solicitacao) {

			if(!servico_solicitacao.id_servico || servico_solicitacao.id_servico.lenght === 0  ){
						next({success: false, msg: "Selecione pelo menos um serviço."});
					}

			if(!servico_solicitacao.id_solicitacao || servico_solicitacao.id_solicitacao.lenght === 0 ){
						next({success: false, msg: "Selecione pelo menos uma solicitacao."});
					}

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (servico_solicitacao, next) {

		servico_solicitacao.checkData(servico_solicitacao, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(servico_solicitacao, "/api/v1/servico_solicitacao/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/servico_solicitacao/", id, next);
		} else {
			next({success: false, msg: "Item inválido.", data: null})
		}
	},
	update: function (id, data, next) {
		if (!id || id <= 0 ) {
			next({success: false, msg: "Id inválido.", data: null})
		}

		servico_solicitacao.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/servico_solicitacao/", id, data, next);
	}
}

module.exports = servico_solicitacao;
