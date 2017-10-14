var _model = require('./model')

const turma_ = {
	listAll: function (next) {
		_model.listAll("/api/v1/turma", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/turma", id, next);
	},
	checkData: function (turma, next) {
		if (turma) {
			if(!turma.nome )
					next({success: false, msg: "O campo Nome é obrigatório."});
					
			if(!turma.id_curso || turma.id_curso.lenght === 0  ){
						next({success: false, msg: "Selecione pelo menos um curso."});
					}
			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (turma, next) {

		turma_.checkData(turma, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(turma, "/api/v1/turma", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/turma/", id, next);
		} else {
			next({success: false, msg: "Item inválido.", data: null})
		}
	},
	update: function (id, data, next) {
		if (!id || id <= 0 ) {
			next({success: false, msg: "Id inválido.", data: null})
		}

		turma_.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/turma/", id, data, next);
	}
}

module.exports = turma_;
