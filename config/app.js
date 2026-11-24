let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Routers: each one handles a group of pages
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let devicesRouter = require('../routes/device');

let app = express();

// Connect to MongoDB 
const mongoose = require('mongoose');
let DB = require('./db');
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');
});

// View engine setup (views folder is one level up from config)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve our own files (CSS, JS, images) and the libraries in node_modules
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/devices', devicesRouter);

// Page not found: pass a 404 to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler: show the error page
app.use(function(err, req, res, next) {
  // Only show error details while developing
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;