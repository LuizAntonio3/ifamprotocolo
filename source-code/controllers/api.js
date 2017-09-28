var HttpStatus = require('http-status-codes');

var _api = {
  handleSuccess: function(data, res) {
      console.log(data)

      res.json({
                resp: JSON.stringify({
                      message: "Operação realizada com sucesso.",
                      data: data
                    })
              });
  },
  handleNotFound: function(data, res) {
        var message = 'Not Found.';

        console.log(message)

        res.status(HttpStatus.NOT_FOUND)
            .json({
                resp: JSON.stringify({
                      message: message,
                      data: data
                    })
              });
  },
  handleInvalidRequest: function(data, res) {
        var message = 'Invalid Request.';

        console.log(message)

        res.status(HttpStatus.BAD_REQUEST)
            .json({
                resp: JSON.stringify({
                      message: message,
                      data: data
                    })
              });
  },
  handleException: function(data, res) {
        console.log(error)
        var message = 'Exceção.';

        console.log(message)

        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                resp: JSON.stringify({
                      message: message,
                      data: error
                    })
              });
  }
}

module.exports = _api;
