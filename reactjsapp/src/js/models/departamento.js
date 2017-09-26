var _model = require('./model')

const departamento = {
	listAll: function (next) {
		_model.listAll("/api/v1/departamento", next);	
	},
	checkData: function (departamento, next) {
		if (departamento) {
			if(!departamento.nome )
					next({success: false, msg: "O campo Nome é obrigatório."});

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (departamento, next) {

		this.checkData(departamento, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(departamento, "/api/v1/departamento/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/departamento/", id, next);
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
		_model.update("/api/v1/departamento/", id, data, next);
	}
}

module.exports = departamento;
