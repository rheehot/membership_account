const createError = require('http-errors');
const express = require('express');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionMiddleWare = session({
  secret: 'aereecho',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000 * 60 * 60, // 지속시간 2시간
  },
});
app.use(sessionMiddleWare);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(3000, () => {
  const port = server.address();
  console.log(`Express server listening on port  ${port.port}`);
});

module.exports = app;
