const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /api/trips - Get all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find().exec();
        if (!trips || trips.length === 0) {
            return res.status(404).json({ 
                "message": "No trips found in database" 
            });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ 
            "error": err.message 
        });
    }
};

// GET: /api/trips/:tripCode - Get a single trip by code
const tripsFindCode = async (req, res) => {
    try {
        const trip = await Trip.find({ 
            'code': req.params.tripCode 
        }).exec();
        
        if (!trip || trip.length === 0) {
            return res.status(404).json({ 
                "message": "Trip not found with code: " + req.params.tripCode 
            });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ 
            "error": err.message 
        });
    }
};

module.exports = {
    tripsList,
    tripsFindCode
};
