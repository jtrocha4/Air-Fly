const { baseAerea } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "base_aerea",
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
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            coordenadas: {
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
            tableName: "base_aerea",
            timestamps: false,
        });
}