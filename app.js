var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Database connection
require('./app_api/models/db');  // ← CHANGED PATH
var apiRouter = require('./app_api/routes/index');  // ← ADDED

var hbs = require('hbs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'hbs');

// Register partials
hbs.registerPartials(path.join(__dirname, 'app_server/views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./app_server/routes/index'));
app.use('/users', require('./app_server/routes/users'));
app.use('/api', apiRouter);  // ← ADDED

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
