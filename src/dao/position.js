const Position = require('../models/position');

exports.getAll = async () => {
    return Position.findAll({
        attributes: ['id', 'name'],
    });
};
