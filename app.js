const path = require('path');
const express = require('express');
const route = require('./routes/main');

const port = 7080;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug'); 


const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));

app.use('/', route); //маршутизация и обработка запросов

app.listen(port, () => {
    console.log('Server started on ' + port + ' port')
})

module.exports = app; //catch this in /bin/www