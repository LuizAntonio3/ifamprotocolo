var _model = require('./model')

const disciplina = {
	listAll: function (next) {
		_model.listAll("/api/v1/disciplina", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/disciplina", id, next);
	},
	checkData: function (disciplina, next) {
		if (disciplina) {
			if(!disciplina.nome )
					next({success: false, msg: "O campo Nome é obrigatório."});
					
			if(!disciplina.id_curso || disciplina.id_curso.lenght === 0  ){
						next({success: false, msg: "Selecione pelo menos um curso."});
					}

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (disciplina, next) {

		this.checkData(disciplina, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(disciplina, "/api/v1/disciplina/", next);
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/disciplina/", id, next);
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
		_model.update("/api/v1/disciplina/", id, data, next);
	}
}

module.exports = disciplina;
