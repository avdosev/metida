var express = require('express');
var route = express.Router();
const bodyParser = require('body-parser'); 
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');



route.get('/', (req, res, next) => { //next only for middleware func lel
    res.render('index');
})

route.get('/login', (req, res, next) => {
    res.render('login');
});

route.get('/signIn', (req, res, next) => {
    res.render('signIn');
});

const urlencodedParser = bodyParser.urlencoded({extended: false});
const bcrypt = require('bcrypt-nodejs');
route.post("/signIn", urlencodedParser, (req, res, next) => {
    const reg = {
        email: req.body.email,
        login:  req.body.login,
        password: req.body.password
    };

    const salt = bcrypt.genSaltSync(10);
    reg.password = bcrypt.hashSync(reg.password, salt);
    console.log(reg);
    res.send(reg); 
    //проверяем есть ли данные поля в нашей бд, и если есть, идем нахер
});


module.exports = route;
