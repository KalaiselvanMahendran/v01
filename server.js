var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);
var flash = require('connect-flash');
var auth = require('./config/secret');

// database connection
var sequelize = require('./config/connection')();
// session
var sessionStore = require('./common/session')(MySQLStore);
// app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    key: auth.key,
    secret: auth.secret,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 730 * 24 * 60 * 60 },
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// express static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.use('/client', express.static(path.resolve(__dirname, 'client')));

// Passport configuration
require('./config/passport')(passport, sequelize);

// index route
var index = express.Router();
require('./routes/index')(index, passport);
app.use('/', index);

// api route
var api = express.Router();
require('./routes/user')(api, sequelize, passport);
require('./routes/category')(api, sequelize);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
