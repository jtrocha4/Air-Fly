module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "parametro",
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncremental: true
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false
        },
        estado: {
          type: DataTypes.TINYINT,
          defaultValue: 1,
          allowNull: false
        }
      },
      {
        tableName: "parametro",
        timestamps: false,
      });
  }