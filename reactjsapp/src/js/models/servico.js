var _model = require('./model')

const servico_ = {
	listAll: function (next) {
		_model.listAll("/api/v1/servico", next);
	},
	checkData: function (servico, next) {
		if (servico) {
			if(!servico.nome || servico.id_curso.lenght === 0 )
					next({success: false, msg: "O campo Nome é obrigatório."});
			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (servico, next) {
		servico_.checkData(servico, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(servico, "/api/v1/servico", next);	
	},
	update: function (id, data, next) {
		if (!id || id <= 0 ) {
			next({success: false, msg: "Id inválido.", data: null})
		}

		servico_.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/servico/", id, data, next);
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/servico/", id, next);
		} else {
			next({success: false, msg: "Item inválido.", data: null})
		}
	}
}

module.exports = servico_;
