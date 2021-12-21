var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var ticketsRouter = require('./routes/tickets');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
    /* useCreateIndex: true,
    useFindAndModify: false, */
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'), // connect method is a promise object
    err => console.log(err) // the way to handle an error as a second argument
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tickets', ticketsRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
