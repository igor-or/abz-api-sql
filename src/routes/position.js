const express = require('express');

const positionController = require('../controllers/position');

const router = express.Router();

router.get('/', positionController.getAllPositions);

module.exports = router;
