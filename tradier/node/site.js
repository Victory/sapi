const tradier = require('./tradier');

var site = {
    home: function (req, res) {
       res.send('tradier home'); 
    },

    quote: function (req, res) {
        var smb = req.params.smb;
        tradier.quotes(smb, function (body) {
            res.setHeader('Content-type', 'application/json');
            res.send(body);
        });
    },

    chains: function (req, res) {
        var smb = req.params.smb;
        tradier.chains(smb, "2016-01-22", function (body) {
            res.setHeader('Content-type', 'application/json');
            res.send(body);
        });
    },

};

module.exports = site;
