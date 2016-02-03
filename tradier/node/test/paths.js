const assert = require('assert');
const tradier = require('../tradier');
var mockTransport = {
    request: function (options, success) {
        success();
    },
};


describe('tradier', function () {
    var quotesUriForSpy = "https://sandbox.tradier.com/v1/markets/quotes?symbols=spy";
    describe('#quotes()', function () {
        it('should call ' + quotesUriForSpy + ' when passed "spy"', function (done) {
            tradier.setTransport(mockTransport);
            tradier.quotes('spy', function () {
                assert.equal(tradier.getLastUriCalled(), quotesUriForSpy);
                done();
            });
        });
    });
});
