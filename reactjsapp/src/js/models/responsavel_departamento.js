var _model = require('./model')

const responsavel_departamento = {
	listAll: function (next) {
		_model.listAll("/api/v1/responsavel_departamento", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/responsavel_departamento", id, next);
	},
	searchByName: function (name, next) {
		next({success: false, msg: "Resposta inválida do servidor.", data: null});
	},
	checkData: function (responsavel_departamento, next) {
		if (responsavel_departamento) {
			if(!responsavel_departamento.nome || responsavel_departamento.nome.lenght === 0 )
					next({success: false, msg: "O campo Nome é obrigatório."});
					
			if(!responsavel_departamento.email || responsavel_departamento.email.lenght === 0 )
					next({success: false, msg: "O campo Email é obrigatório."});
					
			if(!responsavel_departamento.senha || responsavel_departamento.senha.lenght === 0 )
					next({success: false, msg: "O campo Senha é obrigatório."});

			if(!responsavel_departamento.id_departamento || responsavel_departamento.id_departamento.lenght === 0 ){
						next({success: false, msg: "Selecione pelo menos um departamento."});
					}

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (responsavel_departamento, next) {

		responsavel_departamento.checkData(responsavel_departamento, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(responsavel_departamento, "/api/v1/responsavel_departamento", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/responsavel_departamento/", id, next);
		} else {
			next({success: false, msg: "Item inválido.", data: null})
		}
	},
	update: function (id, data, next) {
		if (!id || id <= 0 ) {
			next({success: false, msg: "Id inválido.", data: null})
		}

		responsavel_departamento.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/responsavel_departamento/", id, data, next);
	}
}

module.exports = responsavel_departamento;
