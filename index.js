const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const issuesRouter = require('./routes/issues');

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:27017/issuetracker`

const app = express();
app.use(cors());

// .env setup | Add a .env file if error
dotenv.config({
  path: __dirname + '/.env'
});

//setting up mongoose
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('MongoDB connection success!!');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setting up routers
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/issues', issuesRouter);

/* GET home page. */
app.get('/', function(req, res, next) {
    res.send(`
        <h1> Isssue Tracker </h1>
        <p> Welcome to issuetracker </p>
    `);
});


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
  res.send(err);
});

app.listen(PORT, () => {
  console.log("Issutracker app is running on port " + PORT);
});

module.exports = app;
