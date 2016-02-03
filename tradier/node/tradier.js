const https = require('https');
var fs = require('fs');
var path = require('path');

var httpTransport = {
    request: function (options, success) {
        console.log('real request');
        var body = "";
        var request = https.request(options, function (response) {
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                success(body);
            });
        });
        request.end();

        request.on('error', function(e) {
            console.error(e);
        });
    },
};

var api = {
    lastUriCalled: null,
    transport: null,
    get key() {
        var apiKeyPath = path.join(__dirname, '../tradier.apikey');
        var key = fs.readFileSync(apiKeyPath, {encoding: 'utf-8'});
        return key.trim();
    },

    get options() {
        return {
            host: "sandbox.tradier.com",
            path: "/v1",
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + api.key
            }
        };
    },
    setTransport: function (transport) {
        this.transport = transport;
    },

    getData: function (path, fn) {
        var options = api.options;
        options.path += path; 
        this.lastUriCalled = "https://" + options.host + options.path;
        this.transport.request(options, fn);
     }, 
};

var tradier = {
    getLastUriCalled: function () { 
        return api.lastUriCalled; 
    },
    setTransport: function (transport) {
        api.setTransport(transport);
    },
    // ===== pricing/market data
    quotes: function (smb, fn) {
        var path = "/markets/quotes?symbols=" + smb;
        api.getData(path, fn);
    },

    chains: function (smb, expiration, fn) {
        // TODO encodeUri i.e. create a serialize function
        var path = "/markets/options/chains?symbol=" + smb + "&expiration=" + expiration;
        api.getData(path, fn);
    },

    timesales: function (smb, fn) {
        var path = "/markets/timesales?symbol=" + smb;
        api.getData(path, fn);
    },
    
    history: function (smb, fn) {
        var path = "/markets/history?symbol=" + smb;
        api.getData(path, fn);
    }
};

tradier.setTransport(httpTransport);

module.exports = tradier;
