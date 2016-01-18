var http = require('http');
var fs = require('fs');
var path = require('path');
var Quandl = require("quandl");


var api = {
  get key() {
    var apiKeyPath = path.join(__dirname, '../quandl.apikey');
    var key = fs.readFileSync(apiKeyPath, {encoding: 'utf-8'});
    return key.trim();
  }
};

var quandl = new Quandl();
quandl.configure({
    auth_token: api.key 
});

var stuff = {
    home: function (req, res) {
        res.send('Quandl home');
    },
    price: function (req, res) {
        var simb = req.params.p1;
        simb += (req.params.p2) ? "/" + req.params.p2 : "";
        simb = simb.toUpperCase();
        quandl.dataset(
            { source: simb, format: 'json'}, 
            function(err, response){
                if(err)
                    throw err;

            res.send(response); 
        });
    },
};


module.exports = stuff;
