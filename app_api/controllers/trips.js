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

// POST: /api/trips - Add a new trip
const tripsAdd = async (req, res) => {
    try {
        const newTrip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(newTrip);
    } catch (err) {
        return res.status(400).json({ 
            "error": err.message 
        });
    }
};

// PUT: /api/trips/:tripCode - Update a trip
const tripsUpdate = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true, runValidators: true }
        ).exec();
        
        if (!updatedTrip) {
            return res.status(404).json({ 
                "message": "Trip not found with code: " + req.params.tripCode 
            });
        }
        return res.status(200).json(updatedTrip);
    } catch (err) {
        return res.status(400).json({ 
            "error": err.message 
        });
    }
};

// DELETE: /api/trips/:tripCode - Delete a trip
const tripsDelete = async (req, res) => {
    try {
        const deletedTrip = await Trip.findOneAndDelete({ 
            'code': req.params.tripCode 
        }).exec();
        
        if (!deletedTrip) {
            return res.status(404).json({ 
                "message": "Trip not found with code: " + req.params.tripCode 
            });
        }
        return res.status(204).json(null);
    } catch (err) {
        return res.status(500).json({ 
            "error": err.message 
        });
    }
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAdd,
    tripsUpdate,
    tripsDelete
};
