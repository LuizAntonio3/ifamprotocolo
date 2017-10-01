var request = require('superagent');

const url = "http://localhost:3000";

const model = {
	handleResponse(err, res, next){
		console.log('error',err);
		console.log("resposta",res);
		if (res) {
			if (res.text) {
				try {
					var obj = JSON.parse(res.text);
					console.log("dados",obj);
					var resp = JSON.parse(obj.resp);
					console.log("models",resp);

					if (resp.data) {
						next({success: true, msg: "", data: resp.data});
					} else {
						next({success: false, msg: "Resposta inválida do servidor.", data: resp});
					}

					// if (!res.ok) {
					// 	next({success: false, msg: "Resposta inválida do servidor.", data: resp});
					// } else {
					// 	next({success: true, msg: "", data: resp.data});
					// }
				} catch (error) {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
				}
			} else {
				next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
			}
		} else {
			next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
		}
	},
	listAll: function (route,next) {
		request
		.get(url + route)
		.set('Accept', 'application/json')
		.end(function(err, res){
			model.handleResponse(err, res, next);
		})
	},
	searchByName: function (route, name, next) {
		request
		.get(url + route + name)
		.set('Accept', 'application/json')
		.end(function(err, res){
			model.handleResponse(err, res, next);
		});
	},
	create: function (model, route, next) {
		if (model) {
			
			// Salvando
			request
			.post(url + route)
			.send(model)
			.set('Accept', 'application/json')
			.end(function(err, res){
				model.handleResponse(err, res, next);
			});		
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	update: function (route, id, model, next) {
		if (model) {
			
			// Salvando
			request
			.put(url + route + id)
			.send(model)
			.set('Accept', 'application/json')
			.end(function(err, res){
				model.handleResponse(err, res, next);
			});		
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	delete: function (route, id, next) {
		if (id >= 0) {
			
			// Salvando
			request
			.delete(url + route + id)
			.set('Accept', 'application/json')
			.end(function(err, res){
				model.handleResponse(err, res, next);
			});		
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	findOne: function (route, id, next) {
		if (id >= 0) {
			
			// buscando
			request
			.get(url + route + id)
			.set('Accept', 'application/json')
			.end(function(err, res){
				model.handleResponse(err, res, next);
			});		
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	},
	get: function (route, next) {
			// buscando
			request
			.get(url + route)
			.set('Accept', 'application/json')
			.end(function(err, res){
				model.handleResponse(err, res, next);
			});		
	},
	post: function (route, model, next) {
		if (model) {
			
			// Salvando
			request
			.post(url + route)
			.send(model)
			.set('Accept', 'application/json')
			.end(function(err, res){
				model.handleResponse(err, res, next);
			});
		} else {
			return {success: false, msg: "Erro na aplicação."};
		}
	}
}

module.exports = model;
