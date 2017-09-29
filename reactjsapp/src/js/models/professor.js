var _model = require('./model')

const professor = {
	listAll: function (next) {
		_model.listAll("/api/v1/professor", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/professor", id, next);
	},
	searchByName: function (name, next) {
		next({success: false, msg: "Resposta inválida do servidor.", data: null});
	},
	checkData: function (professor, next) {
		if (professor) {
			if(!professor.nome )
					next({success: false, msg: "O campo Nome é obrigatório."});

			if(!professor.email )
					next({success: false, msg: "O campo Email é obrigatório."});
					
			if(!professor.senha || professor.senha.lenght === 0  )
					next({success: false, msg: "O campo Senha é obrigatório."});

			if(!professor.id_disciplina || professor.id_disciplina.lenght === 0 ){
						next({success: false, msg: "Selecione pelo menos uma disciplina."});
					}

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (professor, next) {

		professor.checkData(professor, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(professor, "/api/v1/professor/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/professor/", id, next);
		} else {
			next({success: false, msg: "Item inválido.", data: null})
		}
	},
	update: function (id, data, next) {
		if (!id || id <= 0 ) {
			next({success: false, msg: "Id inválido.", data: null})
		}

		professor.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/professor/", id, data, next);
	}
}

module.exports = professor;
