
// Setup socket io
const app = require('../app');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const events = require('events');
const eventEmitter = new events.EventEmitter();

io.on('connection', function (socket) {
    eventEmitter.on('nasdaq:trigger', stockData => {
        socket.emit('nasdaq:chart', stockData);
    });
});
