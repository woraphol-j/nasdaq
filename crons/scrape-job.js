'use strict';

const CronJob = require('cron').CronJob;
const logger = require('winston');
const scraper = require('../helpers/Scraper');
const Stock = require('../models/Stock');
const eventEmitter = require('../socket/events');

const NASDAQ_SITE = 'www.nasdaq.com';

new CronJob('1 * * * * *', () => {
    scraper.scrapeForData(NASDAQ_SITE).then(obj => {
        return Stock.create(obj);
    }).then(savedData => {
        logger.info(`Saved data from Nasdaq = ${JSON.stringify(savedData)}`);
        return Stock.findAll();
    }).then(newData => {
        // Emit data to websocket
        eventEmitter.emit('nasdaq:trigger', newData);
    }).catch(err => {
        logger.error(`An error occurred when scraping data from nasdaq = ${err}`);
    });
}, null, true, 'America/Los_Angeles');

