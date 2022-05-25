const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('abz', 'root', 'sarnovichu', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;
