const bCrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const mailer = require("../services/email")
const UserApi = require("../services/user")
const config = require('../config')

const validators = {
    register: {
        validationFailed: 'Валидация не пройдена',
        existedEmail: 'Емейл уже занят',
        userNotCreated: 'Юзер не создан',
    },
    signIn: {
        emailNotExisted: 'Такого емейла не существует',
        incorrectPassword: 'Неправильный пароль.'

    }
}

function generateHash (password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    );
}

async function registrationUser(req, email, password, done) {
    const res = req.res;

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.statusCode = 406;
        res.send(validators.register.validationFailed)
    }
    try {
        const user = await UserApi.getUserByEmail(email)

        if (user) 
            throw new Error(validators.register.existedEmail);
        
        const userPassword = generateHash(password); // зашифрованный
        const username = req.body.login

        const newUser = await UserApi.createUser(email, username, userPassword)
        
        if (!newUser) {
            throw new Error(validators.register.userNotCreated);
        }

        const text = config.messages.activation
        mailer(email, "Confirm this email", text)

        done(null, newUser); //все ок
        
    } catch (err) {
        res.statusCode = 406;
        res.send(err.message)
    }
}

async function signinUser(req, email, password, next) { //некст нас не кинет на следующий обработчик
    const res = req.res;

    const isValidPassword = (userpass, password) => {
        return bCrypt.compareSync(password, userpass);
    };

    try {
        const user = await UserApi.getUserByEmail(email)
        
        if (!user) {
            throw new Error(validators.signIn.emailNotExisted);  
        }
        
        if (!isValidPassword(user.password, password)) {
            throw new Error(validators.signIn.incorrectPassword);
        }

        const userinfo = user.get();
        
        next(null, userinfo);

    } catch(err) {
        res.statusCode = 406;
        res.send(err.message)
    }
}

const loadPasportStrategies = (passport, user) => {
    //const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // для логаута (камингаута)
    passport.deserializeUser((id, done) => {
        //находим юзера
        UserApi.getUserById(id).then(user => {
            done(null, user.get()); //нашли
        }).catch(err => {
            done('not found', null); //не нашли
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            registrationUser
        )
    );

    //LOCAL SIGNIN
    passport.use(
        'local-signin',
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true //позволяет нам передать весь запрос на обратный вызов
            },
            signinUser
        )
    );

};

module.exports = {
    loadPasportStrategies
};
