var _api = require('./model')

const alocacao_professor = {
	listAll: function (next) {
		_api.listAll("/api/v1/alocacao_professor", next);	
	},
	findOne: function (id, next) {
		_api.findOne("/api/v1/alocacao_professor", id, next);
	},
	checkData: function (alocacao_professor, next) {
		if (alocacao_professor) {
			if(!alocacao_professor.nome )
					next({success: false, msg: "O campo Nome é obrigatório."});
					
			if(!alocacao_professor.id_curso || alocacao_professor.id_curso.lenght === 0  ){
						next({success: false, msg: "Selecione pelo menos um curso."});
					}
			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (alocacao_professor, next) {

		this.checkData(alocacao_professor, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_api.create(alocacao_professor, "/api/v1/alocacao_professor", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_api.delete("/api/v1/alocacao_professor/", id, next);
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
		_api.update("/api/v1/alocacao_professor/", id, data, next);
	}
}

module.exports = alocacao_professor;
