var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
const transactionsRouter = require('./routes/transactions.js');
const categoriesRouter = require('./routes/categories.js');
const budgetsRouter = require('./routes/budgets.js');
const settingsRouter = require('./routes/settings.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
/*
app.use('/css', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2/js')));
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);
app.use('/budgets', budgetsRouter);
app.use('/settings', settingsRouter);

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
