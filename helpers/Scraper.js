'use strict';

const request = require('superagent');
const cheerio = require('cheerio');
const logger = require('winston');
const _ = require('lodash');

const scrapeHtml = rawHtml => {
    let $ = cheerio.load(rawHtml);
    let data = $('#indexTable script').html();
    let dataArray = data.split('\n');
    let nasDaqStr = _.filter(dataArray, data => data.indexOf('"NASDAQ"') > -1);
    logger.debug('raw nasdaq line string = ' + nasDaqStr);
    let nasdaqData = nasDaqStr[0].split('"');
    logger.debug('nasdaq array raw = ' + nasdaqData);
    let nasdaqObj = {
        index: nasdaqData[1],
        value: nasdaqData[3],
        changeNet: nasdaqData[7],
        createdAt: new Date(),
        updatedAt: new Date()
    };
    return nasdaqObj;
};
exports.scrapeHtml = scrapeHtml;

exports.scrapeForData = path => {
    return new Promise(function (resolve, reject) {
        request.get(path).then(result => {
            let nasdaqObj = scrapeHtml(result.text);
            resolve(nasdaqObj);
        }).catch(err => {
            reject(err);
        });
    });
};
