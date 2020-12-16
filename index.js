const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db");

const Store = require("./database/Store");

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

app.get("/games", (req, res) => {
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
})

app.listen(5500, () => { console.log("It's working!") })
