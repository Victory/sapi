const tradier = require('./tradier');
const options = require('./options');

var ren = {
    json: function (body) {
        this.setHeader('Content-type', 'application/json');
        this.send(body);
    },
    template: function (res, template, data) {
        res.render(template, {data: data});
    },
    error: function (res, errorString) {
        res.render('error.html', {data: errorString});
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

    plotHistory: function (req, res) {
        var smb = req.params.smb;
        tradier.history(smb, function (body) {
            ren.template(res, 'history.html', body);
        });
    },

    displayChains: function (req, res) {
        var smb = req.params.smb;
        var expiry = req.params.expiry;
        tradier.chains(smb, expiry, function (body) {
            try {
                ren.template(res, 'chains.html', 
                    {strikeTable: options.getStrikeTable(body)}
                );
            } catch (e) {
               ren.error(res, 'no options for expiry'); 
            }
        });
    },
 
    quote: function (req, res) {
        var smb = req.params.smb;
        tradier.quotes(smb, ren.json.bind(res)); 
    },

    history: function (req, res) {
        var smb = req.params.smb;
        tradier.history(smb, ren.json.bind(res)); 
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
