
const chai = require('chai');
const assert = chai.assert;
const logger = require('winston');
const app = require('../../app');
const request = require('supertest')(app);
const Stock = require('../../models/Stock');

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
                assert.equal(res.body[0].index, 'NASDAQ 1');
                assert.equal(res.body[0].value, '40.40');
                assert.equal(res.body[0].changeNet, '1.12');
                assert.equal(res.body[1].index, 'NASDAQ 2');
                assert.equal(res.body[1].value, '50.50');
                assert.equal(res.body[1].changeNet, '2.12');
                done(err);
            });
    });
});
