const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) return res.sendStatus(401);
    req.auth = verified;
    next();
  });
};

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
router.route('/trips').get(tripsController.tripsList).post(authenticateJWT, tripsController.tripsAdd);
router.route('/trips/:tripCode').get(tripsController.tripsFindCode).put(authenticateJWT, tripsController.tripsUpdate).delete(authenticateJWT, tripsController.tripsDelete);

module.exports = router;
