const { empleadoModel, sequelize } = require("../models")

class empleadoService {

    async getEmpleado(id) {
        return empleadoModel.findOne({
            where: {
                id,
                estado: 1
            }
        })
    }

    async getEmpleados(where) {
        return empleadoModel.findAll({
            where: {
                ...where,
                estado: 1
            }
        })
    }

    async createEmpleado(data) {
        const transaccion = await sequelize.transaction()
        try {
            const { id: newEmpleado } = await empleadoModel.create(
                data,
                {
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                id: newEmpleado,
                message: "La creacion ha sido exitosa"
            }
        } catch (error) {
            await transaccion.rollback()
            return {
                message: "Hubo un error en la creacion"
            }
        }
    }

    async updateEmpleado(id, data) {
        const transaccion = await sequelize.transaction()
        try {
            await empleadoModel.update(
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

    async deleteEmpleado(id) {
        const transaccion = await sequelize.transaction()
        try {
            await empleadoModel.update({
                estado: -1
            },
                {
                    where: { id },
                    transaction: transaccion
                })
            await transaccion.commit()
            return {
                id,
                message: "Empleado eliminado correctamente"
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

module.exports = empleadoService;