module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "empleado",
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
            telefono: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            correo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_ocupacion_ea: {
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
            tableName: "empleado",
            timestamps: false,
        });
}