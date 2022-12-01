module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "avion",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncremental: true
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      id_tipo_ea: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      estado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
      }
    },
    {
      tableName: "avion",
      timestamps: false,
    });
}