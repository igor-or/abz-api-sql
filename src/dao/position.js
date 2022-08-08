const Position = require('../models/position');

class PositionDao {
    async getAll() {
        return await Position.findAll({
            attributes: ['id', 'name'],
        });
    }
}

module.exports = new PositionDao();
