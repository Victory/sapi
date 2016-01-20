const tradier = require('./tradier');

var site = {
    home: function (req, res) {
       res.send('tradier home'); 
    },

    quote: function (req, res) {
        tradier.quotes("spy", function (body) {
            res.send(body);
        });
    },

};

module.exports = site;
