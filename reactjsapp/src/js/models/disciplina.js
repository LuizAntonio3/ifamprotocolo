var _model = require('./model')

const disciplina = {
	listAll: function (next) {
		_model.listAll("/api/v1/disciplina", function (res) {
			// console.log('res', res)
			// console.log('res.data', res.data)
			// var data = res.data;
			var length = res.data.length;
			var models = [];

			res.data.map(function (element, index) {
				// var element = data[index];
				// console.log('element', element)
				models.push({
					id: element.id,
					nome: element.nome,
					id_curso: element.id_curso,
					nome_curso: element.curso.nome,
				});

				// console.log('models', models)
				// console.log('index', index)
				// console.log('length', length)

				if (index >= (length - 1)) {
					// console.log('models', models)
					res.data = models;
					next(res);
				}				
			})

			// for (var index = 0; index < length; index++) {
				
			// 	// var element = data[index];
			// 	// console.log('element', element)
			// 	models.push({
			// 		id: 3,
			// 		nome: 'element.nome',
			// 		id_curso: 5,
			// 		nome_curso: 'element.data.nome_curso',
			// 	});

			// 	console.log('models', models)
			// 	console.log('index', index)
			// 	console.log('length', length)

			// 	if (index >= (length - 1)) {
			// 		console.log('models', models)
			// 		res.data = models;
			// 		next(res);
			// 	}
			// }

			// res.data = models;
			// next(res);
		});	
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

		disciplina.checkData(disciplina, function (res) {
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

		disciplina.checkData(data, function (res) {
			if (!res.success) {
				next(res)
			}
		})

		// Update
		_model.update("/api/v1/disciplina/", id, data, next);
	}
}

module.exports = disciplina;
