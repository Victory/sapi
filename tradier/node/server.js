var express = require('express');
var tradier = require('./tradier');

var app = express();

app.get('/', tradier.home);


app.listen(3000);
