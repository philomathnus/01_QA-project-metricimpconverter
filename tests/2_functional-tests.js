const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Convert a valid input - GET request to /api/convert => input=10kg', (done) => {
        const expectedResult = {
            initNum: 1,
            initUnit: 'kg',
            returnNum: 2.20462,
            returnUnit: 'lbs',
            string: '1 kilograms converts to 2.20462 pounds'
        }
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=1kg')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.deepEqual(JSON.parse(res.text), expectedResult);
                done();
            });
    });
    test('Convert an invalid unit - GET request to /api/convert => input=32g', (done) => {
        const expectedResult = 'invalid unit';
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.deepEqual(JSON.parse(res.text), expectedResult);
                done();
            });
    });
    test('Convert an invalid number - GET request to /api/convert => input=3/7.2/4kg', (done) => {
        const expectedResult = 'invalid number';
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.deepEqual(JSON.parse(res.text), expectedResult);
                done();
            });
    });
    test('Convert an invalid number and unit - GET request to /api/convert => input=3/7.2/4kilomegagram', (done) => {
        const expectedResult = 'invalid number and unit';
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.deepEqual(JSON.parse(res.text), expectedResult);
                done();
            });
    });
    test('Convert with no number - GET request to /api/convert => input=kg', (done) => {
        const expectedResult = {
            initNum: 1,
            initUnit: 'kg',
            returnNum: 2.20462,
            returnUnit: 'lbs',
            string: '1 kilograms converts to 2.20462 pounds'
        }
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.deepEqual(JSON.parse(res.text), expectedResult);
                done();
            });
    });
});
