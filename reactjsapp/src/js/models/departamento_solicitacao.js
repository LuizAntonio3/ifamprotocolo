var _model = require('./model')

const departamento_solicitacao = {
	listAll: function (next) {
		_model.listAll("/api/v1/departamento_solicitacao", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/departamento_solicitacao", id, next);
	},
	searchByName: function (name, next) {
		next({success: false, msg: "Resposta inválida do servidor.", data: null});
	},
	checkData: function (departamento_solicitacao, next) {
		if (departamento_solicitacao) {
			if(!departamento_solicitacao.id_departaemnto || departamento_solicitacao.id_departaemnto.lenght === 0 )
					next({success: false, msg: "Selecione um departamento."});
					
			if(!departamento_solicitacao.id_solicitacao || departamento_solicitacao.id_solicitacao.lenght === 0  ){
						next({success: false, msg: "Selecione um solicitação."});
					}

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (departamento_solicitacao, next) {

		this.checkData(departamento_solicitacao, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(departamento_solicitacao, "/api/v1/departamento_solicitacao/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/departamento_solicitacao/", id, next);
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
		_model.update("/api/v1/departamento_solicitacao/", id, data, next);
	}
}

module.exports = departamento_solicitacao;
