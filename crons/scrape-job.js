
const CronJob = require('cron').CronJob;
const logger = require('winston');
const scraper = require('../helpers/Scraper');
const Stock = require('../models/Stock');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const NASDAQ_SITE = 'www.nasdaq.com';

new CronJob('1 * * * * *', () => {
    scraper.scrapeForData(NASDAQ_SITE).then(obj => {
        return Stock.create(obj);
    }).then(savedData => {
        logger.info(`Saved data from Nasdaq = ${JSON.stringify(savedData)}`);
        // Emit data to websocket
        eventEmitter.emit('nasdaq:trigger', savedData);
    }).catch(err => {
        logger.error(`An error occurred when scraping data from nasdaq = ${err}`);
    });
}, null, true, 'America/Los_Angeles');

