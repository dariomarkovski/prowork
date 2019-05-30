import { Sequelize } from "sequelize-typescript";

export default new Sequelize({
    dialect: 'mysql',
    database: 'prowork_node',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    modelPaths: [
        __dirname + '/*.model.ts'
    ],
    operatorsAliases: false,
    query: {
        logging: console.log
    }
});