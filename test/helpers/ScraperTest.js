const chai = require('chai');
const expect = chai.expect;
const logger = require('winston');
const Scraper = require('../../helpers/Scraper');
const path = require('path');

describe('Test Scraper module', function () {
    it('should extract correct stock information from html file', function (done) {
        let nasdaqMockPath = path.join('file:////', '/', __dirname, 'nasdaq-mock.html');
        nasdaqMockPath = "file:///home/woraphol/Dev/nodejs_workspace/nasdaq/test/helpers/nasdaq-mock.html";

        Scraper.scrapeForData(nasdaqMockPath).then(data => {
            logger.info('test = ' + data);
            done();
        }).catch(err => {
            logger.error(err);
            done(err);
        });
    });
});
