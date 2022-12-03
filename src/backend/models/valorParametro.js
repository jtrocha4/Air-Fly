module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "valor_parametro",
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
            tableName: "valor_parametro",
            timestamps: false,
        });
}