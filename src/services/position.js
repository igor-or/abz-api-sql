const positionDao = require('../dao/position');

class PositionService {
    async getAll() {
        return positionDao.getAll();
    }
}

module.exports = new PositionService();
