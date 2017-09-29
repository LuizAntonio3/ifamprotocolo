const _model = require('./model')

const anexo = {
	listAll: function (next) {
		_model.listAll("/api/v1/anexo", next);	
	},
	upload: function (anexo, next) {
		_model.post("/api/v1/anexo/upload", anexo, next);
	}  
}

module.exports = anexo;
