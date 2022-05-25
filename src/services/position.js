const Position = require('../models/position');

exports.getPositions = async () => {
    try {
        return Position.findAll({
            attributes: ['id', 'name'],
        });
    } catch (error) {
        throw error;
    }
};
