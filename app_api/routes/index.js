const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Route for /api/trips - Get all trips
router
    .route('/trips')
    .get(tripsController.tripsList);

// Route for /api/trips/:tripCode - Get a single trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode);

module.exports = router;
