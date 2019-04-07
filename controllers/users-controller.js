const { User } = require('../models') // так я не понял епта почему тут нет цепочечных инклудов 
// сасатъ это не инклуды из си
// скорее всего когда ты вызываешь функцию require то тебе возвращается module.export
// из-за чего ты должен писать конструкцию "const { **** }"
// ПС:возможно ето не так
const { validationResult } = require('express-validator/check');

function create(req, res, next) {
    //console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    res.send(req.body); 

    // const reg = {
    //     email: req.body.email,
    //     login:  req.body.login,
    //     password: req.body.password
    // };
    // const salt = bcrypt.genSaltSync(10);
    // reg.password = bcrypt.hashSync(reg.password, salt);
    // console.log(reg);
    // res.send(reg); 
    // проверяем есть ли данные поля в нашей бд, и если есть, идем нахер
}

module.exports = {
    create
}