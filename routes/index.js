var express = require('express');
var route = express.Router();

// /* GET home page. */
route.get('/', (req, res, next) => { //next only for middleware func lel
    res.render('index');
})

route.get('/login', (req, res, next) => {
    res.render('login');
});

route.get('/signIn', (req, res, next) => {
    res.render('signIn');
});

route.post('/signIn/createUser',  (req, res, next) => {
    //тут будут проверки на стороне сервера
    
});

module.exports = route;
