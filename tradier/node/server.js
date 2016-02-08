var express = require('express');
var site = require('./site');
const nunjucks = require('nunjucks');
var app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(express.static(__dirname + '/static'));

app.get('/', site.home);
app.get('/q/:smb', site.quote);
app.get('/c/:smb/:expiry', site.chains);
app.get('/h/:smb', site.history);
app.get('/ts/:smb', site.timeSales);
app.get('/plot/ts/:smb', site.plotTimeSales);
app.get('/plot/h/:smb', site.plotHistory);
app.get('/chains/:smb/:expiry', site.displayChains);
app.disable('etag');
app.listen(3000);
