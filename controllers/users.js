const { User } = require('../models') // так я не понял епта почему тут нет цепочечных инклудов 
const { validationResult } = require('express-validator/check');

// сасатъ это не инклуды из си
// скорее всего когда ты вызываешь функцию require то тебе возвращается module.export
// из-за чего ты должен писать конструкцию "const { **** }"
// ПС:возможно ето не так
//const Sequelize = require("sequelize");
//var sequelize = new Sequelize('usersDB', 'metidaSQL', '1234');
const bcryptjs = require('bcrypt-nodejs');


function create(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    User.findOne( {
        where: { email: req.body.email}
    }).then(newUser => {
        if(newUser) {
            return Promise.reject({statusCode: 422, message: "Email is  used"});
        }
        else {
            var twa=0;
            const {login, email, password} = req.body;
            const salt = bcryptjs.genSaltSync(10);
            const passwordHash = bcryptjs.hashSync(password, salt);
            return User.create({twa, login, email, password: password});
        }
    }).then (newUser => {
        res.json(newUser);
    })
    
    // sequelize.sync().then(function() {
    //     return User.create({
    //       id: 1,
    //       email: req.body.email,
    //       login: req.body.login,
    //       password: req.body.password
    //     });
    //   }).then(function(jane) {
    //     console.log(jane.get({
    //       plain: true
    //     }));
    //   });
    

    res.send(req.body); 

}

function login(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
}

module.exports = {
    create,
    login
}