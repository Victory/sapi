var express = require('express');
var site = require('./site');
var app = express();

app.get('/', site.home);
app.get('/q', site.quote);

app.listen(3000);
