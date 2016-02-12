const fs = require('fs');
const path = require('path');

var transportOptions = {
    request: function (options, success) {
        setTimeout(function () {
            var dataPath = path.join(__dirname, '../data/mstf-options.dat');
            var data = fs.readFileSync(dataPath, {encoding: 'utf-8'});
            success(data);
        } , 30);
    },
    getName: function () {
        return "mockTransport";
    },
};

module.exports = transportOptions;
