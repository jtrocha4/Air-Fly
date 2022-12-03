const { avionModel, sequelize } = require("../models")

class avionService {

    async getAvion(id) {
        return avionModel.findOne({
            where: {
                id,
                estado: 1
            }
        })
    }

    async getAviones(where) {
        return avionModel.findAll({
            where: {
                ...where,
                estado: 1
            }
        })
    }

    async createAvion(data) {
        const transaccion = await sequelize.transaction()
        try {
            const { id: newAvion } = await avionModel.create(
                data,
                {
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                id: newAvion,
                message: "La creacion ha sido exitosa"
            }
        } catch (error) {
            await transaccion.rollback()
            return {
                message: "Hubo un error en la creacion"
            }
        }
    }

    async updateAvion(id, data) {
        const transaccion = await sequelize.transaction()
        try {
            await avionModel.update(
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

    async deleteAvion(id) {
        const transaccion = await sequelize.transaction()
        try {
            await avionModel.update({
                estado: -1
            },
                {
                    where: { id },
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                id,
                message: "Avion eliminado correctamente"
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

module.exports = avionService;