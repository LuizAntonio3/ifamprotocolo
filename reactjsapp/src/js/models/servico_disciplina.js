var _model = require('./model')

const servico_disciplina = {
	listAll: function (next) {
		_model.listAll("/api/v1/servico_disciplina", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/servico_disciplina", id, next);
	},
	checkData: function (servico_disciplina, next) {
		if (servico_disciplina) {
			if(!servico_disciplina.id_servico || servico_disciplina.id_servico.lenght === 0  ){
						next({success: false, msg: "Selecione pelo menos um serviço."});
					}

			if(!servico_disciplina.id_disciplina || servico_disciplina.id_disciplina.lenght === 0 ){
						next({success: false, msg: "Selecione pelo menos uma disciplina."});
					}

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (servico_disciplina, next) {

		this.checkData(servico_disciplina, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(servico_disciplina, "/api/v1/servico_disciplina/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/servico_disciplina/", id, next);
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
		_model.update("/api/v1/servico_disciplina/", id, data, next);
	}
}

module.exports = servico_disciplina;
