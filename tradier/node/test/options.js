const transport = require(__dirname + '/mocks/transport-options.js'); 
const options = require('../options.js');
const assert = require('assert');

describe('transport', function () {
    it ('should return json data string', function(done) {
        transport.request({}, function (data) {
            JSON.parse(data);
            done();
        });
    });
    it ('should contain options.option with length >= 2', function(done) {
        transport.request({}, function (data) {
            var parsed = JSON.parse(data);
            assert(parsed.options.option.length >= 2);
            done();
        });
    });

});

describe('options', function () {
    it ('should contain options table of length 67', function (done) {
        transport.request({}, function (data) {
            var table = options.getStrikeTable(JSON.parse(data));
            assert(67 == table.length);
            done();
        });

    });

    it ('should order by strike price', function (done) {
        transport.request({}, function (data) {
            var table = options.getStrikeTable(JSON.parse(data));
            var last = Number.MIN_VALUE;
            table.forEach(function (option) {
                assert(typeof(option.strike) === "number");
                assert(option.strike >= last);
                last = option.strike;
            });
            done();
        });
    });
});
