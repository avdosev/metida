var express = require('express');
var route = express.Router();
const bodyParser = require('body-parser'); 
const { userCreateValidator, userLoginValidator } = require('../services/validator');
const userController = require('../controllers/users')
const urlencodedParser = bodyParser.urlencoded({extended: false});

route.use(express.json());

const debug = (req, res, next) => {
    //console.log("req body:", req.body);
    next();
}

route.get('/', (req, res, next) => { //next only for middleware func lel
    res.render('index');
})

route.get('/login', (req, res, next) => {
    res.render('login');
});

route.get('/signin', (req, res, next) => {
    res.render('signin');
});



route.post("/signin", urlencodedParser, debug, userCreateValidator, userController.create);
route.post("/login", urlencodedParser, debug, userLoginValidator, userController.login)


module.exports = route;
