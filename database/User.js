const Sequelize = require("sequelize");
const connection = require("./db");

const User = connection.define('users', { //I think that isn't possible use the name as Model
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

User.sync({ force: false });

module.exports = User;