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

const baseAereaModel = require ("./baseAerea")(
  sequelize,
  Sequelize.DataTypes
)

const parametroModel = require("./parametro")(
  sequelize,
  Sequelize.DataTypes
)

//Relaciones
avionModel.hasMany(baseAereaModel, {
  foreignKey: "id_avion"
})
empleadoModel.hasMany(baseAereaModel, {
  foreignKey:"id_empleado"
})

baseAereaModel.belongsTo(avionModel, {
  foreignKey:"id",
  target_key:"id_avion"
})
baseAereaModel.belongsTo(empleadoModel, {
  foreignKey:"id",
  target_key:"id_empleado"
})

sequelize.sync()

module.exports = { avionModel, sequelize, empleadoModel, baseAereaModel, parametroModel}

// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });

