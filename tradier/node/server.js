var express = require('express');
var site = require('./site');
var app = express();

app.get('/', site.home);
app.get('/q', site.quote);
app.get('/c', site.chains);
app.listen(3000);
