const jwt = require("jsonwebtoken");
const secret = "ifjsdioufjm3ui4j987h89rjhdjq8dje978r";
//need to be the same secret from the index.js page

function auth(req, res, next) {
  const authToken = req.headers['authorization'];

  if(authToken != undefined) {
    const bearer = authToken.split(' '); //Its going to split where has a space
    console.log(bearer);
    var token = bearer[1];
  }

  jwt.verify(token, secret, (error, data) => {
    if(error) {
      res.status(401);
      res.json({ msg: "There is a error, Invalid Token!" })
    } else {
      req.project = "Steam Store";
      req.token = token;
      req.user = {
        email: data.email
      }
      req.createdBy = "CauaS1";
      next();
    }
  });
}

module.exports = auth;