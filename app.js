const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); //dont use yet
const port = 7080;

//const indexRoute = require('/routes/index');
// const registerRoute = require('/routes/register');

const app = express();

//view engine setup
//app.set('views', path.join(__dirname, 'views')); 
//app.set('view engine', 'jade'); 


app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRoute) //will be generate index.jade
// app.use('/register', registerRoute) 


app.get('/', (req, res, next) => { //next only for middleware func lel

})

app.get('/login', (req, res, next) => {
    //res.render('register');
    res.send("Пароль логин и все такие предоставь"); //это какая-то дрисня, нужно рендерить файл
});

app.get('/signIn', (req, res, next) => {
    res.send("Пароль логин создай");
});

// app.get('/articles/:name', (req, res, next) => {
//     res.render('index', {newsId: req.params.name});
// });






app.listen(port);

console.log('server was started');


module.exports = app; //catch this in /bin/www