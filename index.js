const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db");

const jwt = require("jsonwebtoken");
const secret = "ifjsdioufjm3ui4j987h89rjhdjq8dje978r";

const auth = require("./middleware/authenticator");

const Store = require("./database/Store");
const User = require("./database/User");

connection
  .authenticate()
  .then(() => {
    console.log("Success!");
  })
  .catch(errorMsg => {
    console.log(errorMsg);
  })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes

app.get("/games", auth, (req, res) => {
  Store.findAll().then(games => {
    res.json({ games });
    res.sendStatus(200);
  })
});

app.get("/game/:id", (req, res) => {
  var { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    Store.findOne({
      where: { id: id }
    }).then(game => {
      if (game != undefined) {
        res.json({ game });
        res.statusCode(200);
      } else {
        res.statusCode(404);
      }

    })
  }
});

app.post("/game", (req, res) => {
  var { title, year, developer, review } = req.body;
  Store.create({
    title, year, developer, review
  }).then(() => {
    res.sendStatus(200);
  })
});

app.put("/game/:id", (req, res) => {
  const { title, year, developer, review } = req.body;
  const { id } = req.params;

  if (isNaN(id)) {
    res.statusCode(200);
  } else {
    Store.update({ title, year, developer, review }, {
      where: { id: id }
    }).then(() => {
      res.sendStatus(200);
    })
  }
});

app.delete("/game/:id", (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    Store.destroy({
      where: { id: id }
    }).then(() => {
      res.sendStatus(200);
    })
  }
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: {email: email} }).then(account => {
    if(account == undefined) {
      User.create({
        email, password
      }).then(info => {
        res.json({ info });
      })
    } else {
      res.json({ msg: "Error, we already have an account with this email!" })
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } }).then(account => {
    if(account != undefined) {
      if(account.password == password) {
        jwt.sign({
          id: account.id,
          email: account.email
        }, secret, { expiresIn: '1d' }, (error, token) => {
          if(error) {
            res.status(400);
            res.json({ error: "Fail!" })
          } else {
            res.status(200);
            res.json({ token });
          }
        })


      } else {
        res.status(401);
        res.json({ msg: "Invalid Password!" })
      }
    } else {
      res.status(401);
    }
  });
});


app.listen(5500, () => { console.log("It's working!") })
