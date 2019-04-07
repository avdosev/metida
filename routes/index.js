var express = require('express');
var route = express.Router();
const bodyParser = require('body-parser'); 
const { userValidator } = require('../services/validator');
const userController = require('../controllers/users-controller')

route.use(express.json());
const bcrypt = require('bcrypt-nodejs');

route.get('/', (req, res, next) => { //next only for middleware func lel
    res.render('index');
})

route.get('/login', (req, res, next) => {
    res.render('login');
});

route.get('/signIn', (req, res, next) => {
    res.render('signIn');
});

//const urlencodedParser = bodyParser.urlencoded({extended: false});
route.post("/signIn", userValidator, userController.create);


module.exports = route;
