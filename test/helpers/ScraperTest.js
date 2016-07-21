'use strict';

const chai = require('chai');
const assert = chai.assert;
const Scraper = require('../../helpers/Scraper');
const path = require('path');
const Promise = require('bluebird');
const readFile = Promise.promisify(require("fs").readFile);

describe('Test Scraper', function () {
    it('should extract correct stock information from the raw html data from nasdaq.com', function (done) {
        let nasdaqMockPath = path.join(__dirname, 'nasdaq-mock.html');
        readFile(nasdaqMockPath, "utf-8").then(rawHtml => {
            let stockObj = Scraper.scrapeHtml(rawHtml);
            assert.equal(stockObj.index, 'NASDAQ');
            assert.equal(stockObj.value, '5038.58');
            assert.equal(stockObj.changeNet, '0.34');
            done();
        }).catch(done);
    });
});
