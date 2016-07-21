'use strict';

const eventEmitter = require('./events');
const Stock = require('../models/Stock');
const _ = require('lodash');

var setup = function (server) {
    var generateChartDataObj = function (stockList) {
        let result = {
            labels: _.reverse(_.map(stockList, 'createdAt')),
            data: _.reverse(_.map(stockList, 'value'))
        };
        return result;
    };

    const io = require('socket.io')(server);
    io.on('connection', socket => {
        Stock.findAll().then(stockList => {
            socket.emit('nasdaq:chart', generateChartDataObj(stockList));
        });
        eventEmitter.on('nasdaq:trigger', stockList => {
            socket.emit('nasdaq:chart', generateChartDataObj(stockList));
        });
    });
};

module.exports = setup;
