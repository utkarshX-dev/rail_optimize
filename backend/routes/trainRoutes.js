const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

// GET /api/trains - Get all trains
router.get('/', trainController.getAllTrains);

// GET /api/trains/:id - Get train by ID
router.get('/:id', trainController.getTrainById);

// GET /api/trains/route?from=FROM_STATION_ID&to=TO_STATION_ID - Find route between stations
router.get('/route', trainController.findRoute);

module.exports = router;
