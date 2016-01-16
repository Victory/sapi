var express = require('express');
var stuff = require('./stuff');
var app = express();

app.get('/', stuff.home); 

app.listen(3000);
