const passport = require('passport');
const User = require('../models/user');

const register = async function(req, res) {
  console.log('=== REGISTER CALLED ===');
  console.log('Request body:', req.body);
  
  if (!req.body.name || !req.body.email || !req.body.password) {
    console.log('Missing fields');
    return res.status(400).json({ "message": "All fields required" });
  }
  
  try {
    const user = new User({ 
      name: req.body.name, 
      email: req.body.email 
    });
    
    console.log('Setting password...');
    user.setPassword(req.body.password);
    
    console.log('Saving user...');
    await user.save();
    
    console.log('User saved successfully');
    const token = user.generateJWT();
    console.log('Token generated');
    res.status(200).json({ token });
  } catch (err) {
    console.log('Error saving user:', err);
    res.status(404).json(err);
  }
};

const login = function(req, res) {
  console.log('=== LOGIN CALLED ===');
  console.log('Request body:', req.body);
  
  if (!req.body.email || !req.body.password) {
    console.log('Missing email or password');
    return res.status(400).json({ "message": "All fields required" });
  }
  
  passport.authenticate('local', function(err, user, info) {
    console.log('Passport authenticate callback - err:', err);
    console.log('Passport authenticate callback - user:', user);
    console.log('Passport authenticate callback - info:', info);
    
    if (err) {
      console.log('Auth error:', err);
      return res.status(404).json({ error: err.message });
    }
    if (user) {
      console.log('User found, generating token');
      const token = user.generateJWT();
      console.log('Token generated');
      res.status(200).json({ token });
    } else {
      console.log('Auth failed:', info);
      res.status(401).json({ message: info?.message || 'Authentication failed' });
    }
  })(req, res);
};

module.exports = { register, login };
