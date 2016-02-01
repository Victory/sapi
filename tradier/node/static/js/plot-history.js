var d1 = [];
var i1 = 1;
var lastPrice = 0; // last price marked
var pt = .5; // min price change to make mark 
var deltaPrice;
var steps = 0;

// get massage the data
series.history.day.forEach(function (p) {
    var close = p.close;
    var high = p.high;
    var low = p.low;
    var open = p.open;
    deltaPrice = Math.abs(lastPrice - close);
    if (deltaPrice >= pt) {
        steps += 1;
        lastPrice = close;
        d1.push(
            [i1, 
            close, 
            high, 
            low, 
            open]);
        i1 += 1;
    }
});

// plot the chart
Flotr.draw(document.getElementById('flotr'), [d1], { 
    candles: {
        show: true,
        candleWidth: 1,
    },
});

// show mean number of steps per tic
var meanSteps = series.history.day.length / steps;
$("#meanSteps").text(meanSteps.toFixed(2));

