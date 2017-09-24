var _model = require('./model')

const operador = {
	listAll: function (next) {
		_model.listAll("/api/v1/operador", next);	
	},
	checkData: function (operador, next) {
		if (operador) {
			if(!operador.nome )
					next({success: false, msg: "O campo Nome é obrigatório."});
					
			if(!operador.email || operador.email.lenght === 0  )
					next({success: false, msg: "O campo Email é obrigatório."});

			if(!operador.senha || operador.senha.lenght === 0  )
					next({success: false, msg: "O campo Nome é obrigatório."});

			if(!operador.senha || operador.senha.lenght === 0 )
					next({success: false, msg: "O campo Senha é obrigatório."});

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (operador, next) {

		this.checkData(operador, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(operador, "/api/v1/operador/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/operador/", id, next);
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
		_model.update("/api/v1/operador/", id, data, next);
	}
}

module.exports = operador;
