var express = require('express');
var site = require('./site');
var app = express();

app.get('/', site.home);
app.get('/q/:smb', site.quote);
app.get('/c/:smb', site.chains);
app.listen(3000);
