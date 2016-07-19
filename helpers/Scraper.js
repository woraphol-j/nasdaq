
const request = require('superagent');
const cheerio = require('cheerio');
const logger = require('winston');
const _ = require('lodash');
// const Promise = require('bluebird');
// const readFile = Promise.promisify(require("fs").readFile);

exports.scrapeForData = path => {
    return new Promise(function (resolve, reject) {
        request.get(path).then(result => {
            let $ = cheerio.load(result.text);
            let data = $('#indexTable script').html();
            let dataArray = data.split('\n');
            let nasDaqStr = _.filter(dataArray, data => data.indexOf('"NASDAQ"') > -1);
            logger.debug('raw nasdaq line string = ' + nasDaqStr);
            let nasdaqData = nasDaqStr[0].split('"');
            logger.debug('nasdaq array raw = ' + nasdaqData);

            var nasdaqObj = {
                index: nasdaqData[1],
                value: nasdaqData[3],
                changeNet: nasdaqData[7],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            logger.debug(`Data extracted from nasdaq = ${nasdaqData}`);
            resolve(nasdaqObj);
        }).catch(err => {
            reject(err);
        });
    });
};
