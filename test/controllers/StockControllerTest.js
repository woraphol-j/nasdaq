var chai = require('chai');
var expect = chai.expect;
var logger = require('winston');
var app = require('../../app');
var request = require('supertest')(app);
var Stock = require('../../models/Stock');

describe('Test StockController', function () {
    before(function (done) {
        logger.info('Prepare data before testing the api');
        Stock.deleteAll().then(() => {
            return Stock.create({ id: 1, index: 'NASDAQ 1', value: 40.40, changeNet: 1.12, createdAt: new Date(), updatedAt: new Date() });
        }).then(() => {
            return Stock.create({ id: 2, index: 'NASDAQ 2', value: 50.50, changeNet: 2.12, createdAt: new Date(), updatedAt: new Date() });
        }).then(() => {
            done();
        }).catch(done);
    });

    it('should read stock apis correctly', function (done) {
        request.get('/api/stocks')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                logger.info(res.body);
                done();
            });
    });
});
