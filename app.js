const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); //dont use yet
const port = 7080;
//const {check, validationResult} = require('express-validator/check');
const route = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug'); 


const favicon = require('serve-favicon');//пока не робит, в хедере пуга тоже лежит подключение иконки
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));

app.use('/', route);

app.listen(port, () => {
    console.log('Server started on' + port + 'port')
})


module.exports = app; //catch this in /bin/www