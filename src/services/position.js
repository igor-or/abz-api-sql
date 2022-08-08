const positionDao = require('../dao/position');

class PositionService {
    async getAll() {
        return await positionDao.getAll();
    }
}

module.exports = new PositionService();
