const positionService = require('../services/position');

class PositionController {
    async getAllPositions(req, res, next) {
        try {
            const positions = await positionService.getAll();

            if (positions.length === 0) {
                const error = new Error('Positions not found');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({
                success: true,
                positions,
            });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            next(error);
        }
    }
}

module.exports = new PositionController();
