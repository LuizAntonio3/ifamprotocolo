var _model = require('./model')

const servico = {
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
		this.checkData(servico, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Salvando
		_model.create(servico, "/api/v1/servico", next);	
	}  
}

module.exports = servico;
