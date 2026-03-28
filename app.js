var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Database connection
require('./app_server/models/db');
var hbs = require('hbs');  // ← ADD THIS LINE (1)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server/views'));  // ← CHANGE THIS (2)
app.set('view engine', 'hbs');  // ← CHANGE THIS (3)

// Register partials - ADD THIS (4) - VERY IMPORTANT FOR GRADING
hbs.registerPartials(path.join(__dirname, 'app_server/views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// UPDATE these lines to use app_server routes (5)
app.use('/', require('./app_server/routes/index'));
app.use('/users', require('./app_server/routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;