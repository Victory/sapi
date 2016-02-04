const assert = require('assert');
const tradier = require('../tradier');
var mockTransport = {
    request: function (options, success) {
        setTimeout(success, 30);
    },
    getName: function () {
        return "mockTransport";
    },
};


describe('tradier', function () {
    var quotesUriForSpy = "https://sandbox.tradier.com/v1/markets/quotes?symbols=spy";
    var quotesUriForMsft = "https://sandbox.tradier.com/v1/markets/quotes?symbols=msft";
    var quotesUriForF = "https://sandbox.tradier.com/v1/markets/quotes?symbols=f";

    var chainsUri = "https://sandbox.tradier.com/v1/markets/options/chains?symbol=spy&expiration=2019-01-01";
    describe('#quotes()', function () {
        it('should call ' + quotesUriForSpy + ' when passed "spy"', function (done) {
            tradier.setTransport(mockTransport);
            var spyInfo = tradier.quotes('spy', function () {
                assert.equal(spyInfo.uri, quotesUriForSpy);
                done();
            });
        });
        it('should return correct last uri with many requests', function (done) {
            tradier.setTransport(mockTransport);
            var fInfo = tradier.quotes('f', function () {});
            var spyInfo = tradier.quotes('spy', function () {});
            var msftInfo = tradier.quotes('msft', function () {});
            assert.equal(fInfo.uri, quotesUriForF);
            assert.equal(spyInfo.uri, quotesUriForSpy);
            assert.equal(msftInfo.uri, quotesUriForMsft);
            setTimeout(done, 200);
        });
    });

    describe('#chains()', function () {
        it('should call ' + chainsUri +  ' when passed "spy" expiry 2020-01-01', function (done) {
            tradier.setTransport(mockTransport);
            var chains = tradier.chains('spy', '2019-01-01', function () {}); 
            assert.equal(chains.uri, chainsUri);
            done();
        });
    });
});
