var express = require('express');
var tradier = require('./tradier');

var app = express();

app.get('/', tradier.home);
app.get('/q', tradier.quote);

app.listen(3000);
