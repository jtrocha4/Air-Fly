const env = require("dotenv")

env.config()

const configuracion = {
    addPort: process.env.PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    dataBase: process.env.DATABASE
}

module.exports = configuracion