
function getStrikePriceProto () {
    return {
        putAsk: -1,
        putBid: -1,
        strike: -1,
        callAsk: -1,
        callBid: -1,
    };
}

var options = {
    getStrikeTable: function (options) {
        if (typeof(options) === "string") {
            data = JSON.parse(options);
        } else {
            data = options;
        }

        var table = [];
        data.options.option.forEach(function (option) {
            console.log(option);
            var s = getStrikePriceProto();
            if (option.option_type === "put") {
                s.putAsk = option.ask;
                s.putBid = option.bid;
                s.strike = option.strike;
                table.push(s);
            }
    
        });
        table.sort(function (lhs, rhs) {
            return lhs.strike - rhs.strike;
        });
        return table;
    }
};

module.exports = options;
