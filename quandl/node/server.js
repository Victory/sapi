var express = require('express');
var stuff = require('./stuff');
var app = express();

app.get('/', stuff.home); 
app.get('/c', stuff.price);
app.listen(3000);
