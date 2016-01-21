const tradier = require('./tradier');

var site = {
    home: function (req, res) {
       res.send('tradier home'); 
    },

    quote: function (req, res) {
        tradier.quotes("spy", function (body) {
            res.setHeader('Content-type', 'application/json');
            res.send(body);
        });
    },

    chains: function (req, res) {
        tradier.chains("spy", "2016-01-22", function (body) {
            res.setHeader('Content-type', 'application/json');
            res.send(body);
        });
    },

};

module.exports = site;
