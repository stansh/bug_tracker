require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');

var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
//const config = require('./config');
// const url = process.env.URL 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var ticketsRouter = require('./routes/tickets');

//const url = config.mongoUrl;
const connect = mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err) 
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: ['https://bugtrackerstas.azurewebsites.net','http://localhost:3000'],  
  methods: ['GET', 'POST', 'PUT', 'DELETE']  
}));

// app.use(express.static(path.join(__dirname, '/build')));

app.use(passport.initialize());


// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tickets', ticketsRouter);

 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'build','index.html'));
  })
}



//  catch 404 and forward to error handler
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
