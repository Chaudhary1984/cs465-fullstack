const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Route for /api/trips - Get all trips and Add new trip
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAdd);

// Route for /api/trips/:tripCode - Get single, Update, Delete
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(tripsController.tripsUpdate)
    .delete(tripsController.tripsDelete);

module.exports = router;
