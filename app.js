'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Initialize database
require('./db/knex');

// Initialize cron jobs, disabling it in test mode
if (process.env.NODE_ENV !== 'test') {
	require('./crons/scrape-job');
}

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Binding routes to main express app
require('./routes/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const events = require('events');
// const eventEmitter = new events.EventEmitter();

// io.on('connection', function (socket) {
//     eventEmitter.on('nasdaq:trigger', stockData => {
//         socket.emit('nasdaq:chart', stockData);
//     });
// });

console.info('Server running successfully');
module.exports = app;
