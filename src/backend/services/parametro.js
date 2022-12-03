const { parametroModel, sequelize } = require("../models")

class parametroService {

    async getParametro(id) {
        return parametroModel.findOne({
            where: {
                id,
                estado: 1
            }
        })
    }

    async getParametros(where) {
        return parametroModel.findAll({
            where: {
                ...where,
                estado: 1
            }
        })
    }

    async createParametro(data) {
        const transaccion = await sequelize.transaction()
        try {
            const { id: newParametro } = await parametroModel.create(
                data,
                {
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                id: newParametro,
                message: "La creacion ha sido exitosa"
            }
        } catch (error) {
            await transaccion.rollback()
            return {
                message: "Hubo un error en la creacion"
            }
        }
    }

    async updateParametro(id, data) {
        const transaccion = await sequelize.transaction()
        try {
            await parametroModel.update(
                data,
                {
                    where: { id },
                    transaction: transaccion
                })
            transaccion.commit()
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

    async deleteParametro(id) {
        const transaccion = await sequelize.transaction()
        try {
            await parametroModel.update({
                estado: -1
            },
                {
                    where: { id },
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                id,
                message: "Parametro eliminado correctamente"
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

module.exports = parametroService;