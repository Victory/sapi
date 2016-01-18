var express = require('express');
var stuff = require('./stuff');
var app = express();

app.get('/', stuff.home); 
app.get('/c/:p1', stuff.price);
app.get('/c/:p1/:p2', stuff.price);
app.listen(3000);
