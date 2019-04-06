var express = require('express');
var route = express.Router();
const bodyParser = require('body-parser'); 
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
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

const urlencodedParser = bodyParser.urlencoded({extended: false});
route.post("/signIn", urlencodedParser, (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const login = req.body.login;
    //res.send(email + password + login); 
    //проверяем есть ли данные поля в нашей бд, и если есть, идем нахер
});


module.exports = route;
