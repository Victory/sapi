const https = require('https');
var fs = require('fs');
var path = require('path');

var api = {
  get key() {
    var apiKeyPath = path.join(__dirname, '../tradier.apikey');
    var key = fs.readFileSync(apiKeyPath, {encoding: 'utf-8'});
    return key.trim();
  }
};


var tradier = {
    home: function (req, res) {
       res.send('tradier home'); 
    },

    quote: function (req, res) {
        var options = {
            host: "sandbox.tradier.com",
            path: "/v1/markets/quotes?symbols=spy",
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + api.key
            }
        };

        var request = https.request(options, function (response) {
            var body = "";
            response.on('data', function (data) {
                body += data;
                //process.stdout.write(data);
            });
            response.on('end', function () {
                res.send(body);
            });
        });
        request.end();

        request.on('error', function(e) {
            console.error(e);
        });
    },

};


module.exports = tradier;
