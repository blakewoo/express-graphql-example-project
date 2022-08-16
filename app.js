var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
let mongoose = require("mongoose")
let config = require('./config.js')
let mariaDB = require('./mariaDB_connection')

const session = require('express-session')
const MemoryStore = require('memorystore')(session)

var app = express();

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  secret: config.sessionSecretKey
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Mongo DB Connect
mongoose.connect("mongodb://"+config.database.address)

mongoose.connection.on('connected', function () {
  console.log("Mongo DB connected")
});

mongoose.connection.on('disconnected', function (err) {
  console.log("Mongo DB disconnected")
  console.log(err)
});

mariaDB.getConnection()
.then(conn => {
  console.log("Maria DB connected");
  conn.release(); //release to pool
})
.catch(err => {
  console.log(err)
  console.log("Maria DB disconnected");
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
