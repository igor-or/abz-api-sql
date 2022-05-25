const positionService = require('../services/position');

exports.getPositions = async (req, res, next) => {
    try {
        const positions = await positionService.getPositions();
        console.log(positions)
        if (positions.length === 0) {
            const error = new Error('Positions not found');
            error.statusCode = 422;
            return next(error);
        }

        res.status(200).json({
            success: true,
            positions,
        });
    } catch (error) {
        error.statusCode = 500;
        // error.message = 'Internal server error';
        next(error);
    }
};
