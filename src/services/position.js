const positionDao = require('../dao/position');

exports.getAll = async () => {
    return positionDao.getAll();
};
