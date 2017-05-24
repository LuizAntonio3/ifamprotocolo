const jwt = require('jwt-simple')
const key = "08ads091"

var token = {
  generate: function(payload) {

    return jwt.encode(payload, key)
  },
  verify: function (token) {
    if (token) {
      try {
        return jwt.decode(token, key)
      } catch (e) {
        console.log("Exception on token deconding");
        return null;
      } finally {
        console.log("Exception on token deconding");
        return null;
      }
    }
    else {
      console.log("Token null");
      return null;
    }
  }
}

module.exports = token;
