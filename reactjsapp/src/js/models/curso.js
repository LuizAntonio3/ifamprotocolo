var _model = require('./model')

const curso_ = {
	listAll: function (next) {
		_model.listAll("/api/v1/curso", next);	
	},
	findOne: function (id, next) {
		_model.findOne("/api/v1/curso", id, next);
	},
	searchByName: function (name, next) {
		next({success: false, msg: "Resposta inválida do servidor.", data: null});
	},
	checkData: function (curso, next) {
		if (curso) {
			if(!curso.nome || curso.nome.lenght === 0  )
					next({success: false, msg: "O campo Nome é obrigatório."});

			if(!curso.tipo || curso.tipo.lenght === 0 )
					next({success: false, msg: "O campo Tipo é obrigatório."});


			if(!curso.ano_letivo || curso.ano_letivo.lenght === 0 )
					next({success: false, msg: "O campo Ano Letivo é obrigatório."});

			// ok
			next({success: true, msg: ""});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	create: function (curso, next) {

		curso_.checkData(curso, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(curso, "/api/v1/curso/", next);	
	},
	delete: function (id, next) {
		if (id && id > 0) {
			// Salvando
			_model.delete("/api/v1/curso/", id, next);
		} else {
			next({success: false, msg: "Item inválido.", data: null})
		}
	},
	update: function (id, data, next) {
		if (!id || id <= 0 ) {
			next({success: false, msg: "Id inválido.", data: null})
		}

		curso_.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/curso/", id, data, next);
	}
}

module.exports = curso_;
