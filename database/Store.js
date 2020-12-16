const Sequelize = require("sequelize");
const connection = require("./db");

const Store = connection.define('games', { //I think that isn't possible use the name as Model
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  year: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  developer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  review: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Store.sync({ force: false });

module.exports = Store;