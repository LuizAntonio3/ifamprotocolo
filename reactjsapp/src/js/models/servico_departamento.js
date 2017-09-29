var _model = require('./model')

const servico_departamento = {
	listAll: function (next) {
		_model.listAll("/api/v1/servico_departamento", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/servico_departamento", id, next);
	},
	searchByName: function (name, next) {
		next({success: false, msg: "Resposta inválida do servidor.", data: null});
	},
	checkData: function (servico_departamento, next) {
		if (servico_departamento) {
			if(!servico_departamento.id_servicos || servico_departamento.id_servicos.lenght === 0  ){
						next({success: false, msg: "Selecione pelo menos um serviço."});
					}

			if(!servico_departamento.id_departamentos || servico_departamento.id_departamentos.lenght === 0 ){
						next({success: false, msg: "Selecione pelo menos um departamento."});
					}

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (servico_departamento, next) {

		servico_departamento.checkData(servico_departamento, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(servico_departamento, "/api/v1/servico_departamento/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/servico_departamento/", id, next);
		} else {
			next({success: false, msg: "Item inválido.", data: null})
		}
	},
	update: function (id, data, next) {
		if (!id || id <= 0 ) {
			next({success: false, msg: "Id inválido.", data: null})
		}

		servico_departamento.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/servico_departamento/", id, data, next);
	}
}

module.exports = servico_departamento;
