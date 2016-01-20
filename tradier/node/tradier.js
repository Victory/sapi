const https = require('https');
var fs = require('fs');
var path = require('path');

var api = {
  get key() {
    var apiKeyPath = path.join(__dirname, '../tradier.apikey');
    var key = fs.readFileSync(apiKeyPath, {encoding: 'utf-8'});
    return key.trim();
  },

  get options() {
    return {
        host: "sandbox.tradier.com",
        path: "/v1/markets/quotes?symbols=",
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + api.key
        }
    };
  }
};

var tradier = {
    quotes: function (smb, fn) {
        var options = api.options;
        options.path += smb;
        var body = "";
        var request = https.request(options, function (response) {
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                fn(body);
            });
        });
        request.end();

        request.on('error', function(e) {
            console.error(e);
        });

        return null;
    }
};

module.exports = tradier;
