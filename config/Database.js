import {Sequelize} from "sequelize";

const db = new Sequelize(
    process.env.DB_NAME || 'db_tiketgercep', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
});

export default db;