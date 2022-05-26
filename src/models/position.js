const Sequelize = require('sequelize');

const sequelize = require('../db');
const User = require('./user');

const Position = sequelize.define(
    'position',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    { timestamps: false }
);
// Position.hasMany(User);

module.exports = Position;
