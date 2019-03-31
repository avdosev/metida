var express = require('express');
var app = express();

// создаём маршрут
app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});


app.listen(7060);

console.log('e');