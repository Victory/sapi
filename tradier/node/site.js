const tradier = require('./tradier');

var ren = {
    json: function (body) {
        this.setHeader('Content-type', 'application/json');
        this.send(body);
    },
    template: function (res, template, data) {
        res.render(template, {data: data});
    },
};

var site = {
    home: function (req, res) {
       res.render('index.html'); 
    },

    plotTimeSales: function (req, res) {
        var smb = req.params.smb;
        tradier.timesales(smb, function (body) {
            ren.template(res, 'time-sales.html', body);
        });
    },

    quote: function (req, res) {
        var smb = req.params.smb;
        tradier.quotes(smb, ren.json.bind(res)); 
    },

    chains: function (req, res) {
        var smb = req.params.smb;
        var expiry = req.params.expiry;
        tradier.chains(smb, expiry, ren.json.bind(res));
    },
    
    timeSales: function (req, res) {
        var smb = req.params.smb;
        tradier.timesales(smb, ren.json.bind(res));
    },
};

module.exports = site;
