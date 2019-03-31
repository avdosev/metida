var path = require('path');
var express = require('express');
const port = 7080;
var app = express();

app.use(express.static(path.join(__dirname, '/../public')));

app.listen(port);

console.log('e');