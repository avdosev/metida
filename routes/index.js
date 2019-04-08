var express = require('express');
var route = express.Router();
const bodyParser = require('body-parser'); 
const { userValidator } = require('../services/validator');
const userController = require('../controllers/users-controller')
const urlencodedParser = bodyParser.urlencoded({extended: false});

route.use(express.json());
const bcrypt = require('bcrypt-nodejs');

const debug = (req, res, next) => {
    console.log("req body:", req.body);
    next();
}

route.get('/', (req, res, next) => { //next only for middleware func lel
    res.render('index');
})

route.get('/login', (req, res, next) => {
    res.render('login');
});

route.get('/signIn', (req, res, next) => {
    res.render('signIn');
});

route.post("/signIn", urlencodedParser, debug, userValidator, userController.create);

module.exports = route;
