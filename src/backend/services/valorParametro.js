const { valorParametroModel, sequelize } = require("../models")

class valorParametroService {

    async getValorParametro(id) {
        return valorParametroModel.findOne({
            where: {
                id,
                estado: 1
            }
        })
    }

    async getValorParametros(where) {
        return valorParametroModel.findAll({
            where: {
                ...where,
                estado: 1
            }
        })
    }

    async createValorParametro(data) {
        const transaccion = await sequelize.transaction()
        try {
            const { id: newValorParametro } = await valorParametroModel.create(
                data,
                {
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                id: newValorParametro,
                message: "La creacion ha sido exitosa"
            }
        } catch (error) {
            await transaccion.rollback()
            return {
                message: "Hubo un error en la creacion"
            }
        }
    }

    async updateValorParametro(id, data) {
        const transaccion = await sequelize.transaction()
        try {
            await valorParametroModel.update(
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

    async deleteValorParametro(id) {
        const transaccion = await sequelize.transaction()
        try {
            await valorParametroModel.update({
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

module.exports = valorParametroService;