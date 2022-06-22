const { Sequelize } = require('sequelize');

const config = require('../config');

const sequelize = new Sequelize({
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,
    host: config.DB_SERVER,
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, 
        },
    },
});

module.exports = sequelize;
