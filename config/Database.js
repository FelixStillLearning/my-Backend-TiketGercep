import {Sequelize} from "sequelize";

const db = new Sequelize('db_tiketgercep', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;