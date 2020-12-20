const jwt = require("jsonwebtoken");
const secret = "ifjsdioufjm3ui4j987h89rjhdjq8dje978r";
//need to be the same secret from the index.js page

function auth(req, res, next) {
  const authToken = req.headers['authorization'];

  console.log(authToken);
  next();

  /*probably there is a error in this function, more specif in authtoken*/
}

module.exports = auth;