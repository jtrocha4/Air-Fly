const { baseAereaModel, sequelize, avionModel, empleadoModel } = require("../models")

class baseAereaService {

    async getBaseAerea(id) {
        return baseAereaModel.findOne({
            include:[{model:avionModel},{model:empleadoModel}],
            where: {
                id,
                estado: 1
            }
        })
    }

    async getBasesAereas(where) {
        return baseAereaModel.findAll({
            include:[{model:avionModel},{model:empleadoModel}],
            where: {
                ...where,
                estado: 1
            },
            attributes: {exclude: ["id_avion", "id_empleado"]}
        })
    }

    async CreateBase (data) {
        const transaccion = sequelize.transation();
        try {
            const {id:NewBase} = await baseAereaModel.create(
                data,{
                    transation:transaccion
                }
                )
            await transaccion.commit()
            return{
                id: NewBase,
                message:"La creacion ha sido exitosa"
            }
        } catch (error) {
            await transaccion.rollback()
            return{
                message:"Hubo un error en la creacion"
            }
        }
    }

    async updateBaseAerea(id, data) {
        const transaccion = await sequelize.transaction()
        try {
            await baseAereaModel.update(
                data,
                {
                    where: { id },
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                data,
                message: "La actualizacion de los datos se ha hecho correctamente"
            }
        } catch (error) {
            transaccion.rollback()
            return {
                message: "Hubo un error en la actualizacion de los datos"
            }
        }
    }

    async deleteBaseaerea(id) {
        const transaccion = await sequelize.transaction()
        try {
            await baseAereaModel.update({
                estado: -1
            },
                {
                    where: { id },
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                id,
                message: "Base aerea eliminada correctamente"
            }
        } catch (error) {
            await transaccion.rollback()
            return {
                id,
                message: "Hubo un error en la eliminacion"
            }
        }
    }
}

module.exports = baseAereaService;