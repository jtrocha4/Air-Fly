const config = require("../config/config")
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.dataBase,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: 'mysql'
  }
);

//Modelos
const avionModel = require("./avion")(
  sequelize,
  Sequelize.DataTypes
)

const empleadoModel = require("./empleado")(
  sequelize,
  Sequelize.DataTypes
)

sequelize.sync()

module.exports = { avionModel, sequelize, empleadoModel}

// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });

