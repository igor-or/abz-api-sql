const Position = require('../models/position');

class PositionDao {
    async getAll() {
        return Position.findAll({
            attributes: ['id', 'name'],
        });
    }
}

module.exports = new PositionDao();
