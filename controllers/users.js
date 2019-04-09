const { User } = require('../models') // так я не понял епта почему тут нет цепочечных инклудов 
const { validationResult } = require('express-validator/check');
const bcryptjs = require('bcrypt-nodejs');
// сасатъ это не инклуды из си
// скорее всего когда ты вызываешь функцию require то тебе возвращается module.export
// из-за чего ты должен писать конструкцию "const { **** }"
// ПС:возможно ето не так

function create(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    User.findOne( {
        where: { email: req.body.email}  //тут только те проверки, в которых не обойдешься без запрсов к БД
    }).then(newUser => {
        if(newUser) {
            Promise.reject(new Error("Почта уже использована")).then(function(error) {
                //console.log(error); 
                return error; // повторно выбрасываем ошибку, вызывая новый reject
              });
        }
        else {
            var twa=0;
            const {login, email, password} = req.body;
            const salt = bcryptjs.genSaltSync(10);
            const passwordHash = bcryptjs.hashSync(password, salt);
            return User.create({twa, login, email, password: passwordHash}); //twa - переменная для id (в бд плюсанется автоматически)
        //как мы работаем с хешпаролем
        //хешфункция всегда возвращает одно и тоже значение при одинаковом вводе, поэтому все будет норм ебать
        //зашифровываем пароль однажды и кидаем это в БД(мы пароль юзера знать не будем, хеш работает в одну сторону)
        //если юзер хочет сменить пароль, просто хешируем новый пароль и обновляем запись
        }
    }).then (newUser => {
        res.json(newUser);
    })
       

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