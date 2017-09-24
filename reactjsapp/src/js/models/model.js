var request = require('superagent');

const url = "http://localhost:3000";

const model = {
	listAll: function (route,next) {
		request
		.get(url + route)
		.set('Accept', 'application/json')
		.end(function(err, res){
			console.log(err);
			console.log("resposta",res);
			if (res) {
				if (res.text) {
					try {
						var obj = JSON.parse(res.text);
						console.log("dados",obj);
						var resp = JSON.parse(obj.resp);
						console.log("models",resp);

						if (err || !res.ok) {
							next({success: false, msg: "Resposta inválida do servidor.", data: resp});
						} else {
							next({success: true, msg: "", data: resp});
						}
					} catch (error) {
						next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
					}
				} else {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
				}
			} else {
				next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
			}
		})
	},
	searchByName: function (route, name, next) {
		request
		.get(url + route + name)
		.set('Accept', 'application/json')
		.end(function(err, res){
			console.log(err);
			console.log(res);
			if (res) {
				if (res.text) {
					try {
						
						var obj = JSON.parse(res.text);
						console.log("dados",obj);
						var resp = JSON.parse(obj.resp);
						console.log("models",resp);

						if (err || !res.ok) {
							next({success: false, msg: "Resposta inválida do servidor.", data: resp});
						} else {
							next({success: true, msg: "", data: resp});
						}
					} catch (error) {
						next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
					}
				} else {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
				}
			} else {
				next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
			}
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
				console.log(err);
				console.log(res);
				if (res && !err) {
					if (res.text && res.ok) {
						try {
							var obj = JSON.parse(res.text);
							console.log("text",obj);
							var resp = JSON.parse(obj.resp);
							console.log("resp",resp);

							next({success: true, msg: "", data: resp});
						} catch (error) {
							next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
						}
					} else {
						next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
					}
				} else {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: err});
				}
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
				console.log(err);
				console.log(res);
				if (res) {
					if (res.text) {
						try {
							
							var obj = JSON.parse(res.text);
							console.log("dados",obj);
							var resp = JSON.parse(obj.resp);
							console.log("models",resp);

							if (err || !res.ok) {
								next({success: false, msg: "Resposta inválida do servidor.", data: resp});
							} else {
								next({success: true, msg: "", data: resp});
							}
						} catch (error) {
							next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
						}
					} else {
						next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
					}
				} else {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
				}
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
				console.log(err);
				console.log(res);
				if (res) {
					if (res.text) {
						try {
							
							var obj = JSON.parse(res.text);
							console.log("dados",obj);
							var resp = JSON.parse(obj.resp);
							console.log("models",resp);

							if (err || !res.ok) {
								next({success: false, msg: "Resposta inválida do servidor.", data: resp});
							} else {
								next({success: true, msg: "", data: resp});
							}
						} catch (error) {
							next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
						}
					} else {
						next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
					}
				} else {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
				}
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
				console.log(err);
				console.log(res);
				if (res && !err && res.text && res.ok) {
					try {
						var obj = JSON.parse(res.text);
						console.log("text",obj);
						var resp = JSON.parse(obj.resp);
						console.log("resp",resp);

						next({success: true, msg: "", data: resp});
					} catch (error) {
						next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
					}
				} else {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: err});
				}
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
				console.log(err);
				console.log(res);
				if (res && !err && res.text && res.ok) {
					try {
						var obj = JSON.parse(res.text);
						console.log("text",obj);
						var resp = JSON.parse(obj.resp);
						console.log("resp",resp);

						next({success: true, msg: "", data: resp});
					} catch (error) {
						next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: obj});
					}
				} else {
					next({success: false, msg: "Falha de comunicação com o servidor. Verifique sua conexão.", data: err});
				}
				});		
	}
}

module.exports = model;
