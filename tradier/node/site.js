const tradier = require('./tradier');

var r = {
    json: function (body) {
        this.setHeader('Content-type', 'application/json');
        this.send(body);
    },
};

var site = {
    home: function (req, res) {
       res.send('tradier home'); 
    },

    quote: function (req, res) {
        var smb = req.params.smb;
        tradier.quotes(smb, r.json.bind(res)); 
    },

    chains: function (req, res) {
        var smb = req.params.smb;
        var expiry = req.params.expiry;
        tradier.chains(smb, expiry, r.json.bind(res));
    },
    
    timesales: function (req, res) {
        var smb = req.params.smb;
        tradier.timesales(smb, r.json.bind(res));
    },
};

module.exports = site;
