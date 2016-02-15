
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
        var grid = {};
        data.options.option.forEach(function (option) {
            var s;
            if (typeof(grid[option.strike]) == "undefined") {
                s = getStrikePriceProto();
            } else {
                s = grid[option.strike];
            }

            s.strike = option.strike;
            if (option.option_type === "put") {
                s.putAsk = option.ask;
                s.putBid = option.bid;
            } else {
                s.callAsk = option.ask;
                s.callBid = option.bid;
            }
            grid[s.strike] = s;
        });
        var strike;
        for (strike in grid) {
            table.push(grid[strike]);
        }
        table.sort(function (lhs, rhs) {
            return lhs.strike - rhs.strike;
        });
        return table;
    }
};

module.exports = options;
