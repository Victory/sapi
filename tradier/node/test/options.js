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

