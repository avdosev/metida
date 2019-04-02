const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); //dont use yet
const port = 7080;

//const indexRoute = require('/routes/index'); //пока не хочу роуты выкидыать в отдельный файл
// const registerRoute = require('/routes/register');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug'); 

// app.use('/', indexRoute) //will be generate index.jade
// app.use('/register', registerRoute) 


app.get('/', (req, res, next) => { //next only for middleware func lel
    res.render('index')
})

app.get('/login', (req, res, next) => {
    res.render('login');
});

app.get('/signIn', (req, res, next) => {
    res.render('signIn');
});

// app.get('/articles/:name', (req, res, next) => {
//     res.render('index', {newsId: req.params.name});
// });






app.listen(port);

console.log('server was started');


module.exports = app; //catch this in /bin/www