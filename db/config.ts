import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.LEARNDASH_DB_NAME as string
const dbUser = process.env.LEARNDASH_DB_USER as string
const dbHost = process.env.LEARNDASH_DB_HOST
const dbPort = process.env.LEARNDASH_DB_PORT
const dbDriver = process.env.LEARNDASH_DB_DRIVER as Dialect
const dbPassword = process.env.LEARNDASH_DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    port: Number(dbPort)
})

export default sequelizeConnection