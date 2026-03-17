// app_server/controllers/main.js

// Home page controller
exports.home = function(req, res) {
  res.render('index', { 
    title: 'Home' 
  });
};

// Travel page controller
exports.travel = function(req, res) {
  res.render('travel', { 
    title: 'Travel' 
  });
};