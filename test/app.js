// var expect = require('chai').expect;
const logger = require('winston');
const app = require('../app');
const request = require('supertest')(app);

before(function () {
    logger.info('Initialize server before running tests.');
});

after(function () {
    logger.info('Tearing down server as the tests end.');
});

describe('Test server status', function () {
    it('Check if server is up and running', function (done) {
        request.get('/').expect(200, done);
    });
});
