/**
 * Created by woraphol on 16/6/2559.
 */

var CronJob = require('cron').CronJob;
var logger = require('winston');
const scraper = require('../helpers/Scraper');
const Stock = require('../models/Stock');
const NASDAQ_SITE = 'www.nasdaq.com';

new CronJob('1 * * * * *', () => {
    scraper.scrapeForData(NASDAQ_SITE).then(obj => {
        return Stock.create(obj);
    }).then(savedData => {
        logger.info(`Saved data from Nasdaq = ${JSON.stringify(savedData)}`);
    }).catch(err => {
        logger.error(`An error occurred when scraping data from nasdaq = ${err}`);
    });
}, null, true, 'America/Los_Angeles');

