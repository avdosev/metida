import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import bCrypt from 'bcrypt';
const { validationResult } = require('express-validator/check');
import mailer from "../services/email.js";
import * as UserApi from "../services/user.js";
import config from '../config/index.js';
import jwt from "jsonwebtoken"

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
};

function generateHash (password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    );
}

export async function registrationUser(req, email, password) {
    //const res = req.res;

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

        const text = config.messages.activation;
        try {
            mailer(email, "Confirm this email", text);
        } catch(err) {
            console.log(err);
        }

        //done(null, newUser); //все ок
        
    } catch (err) {
        res.statusCode = 406;
        res.send(err.message)
    }
}

export async function signinUser(req, res, next) { //некст нас не кинет на следующий обработчик
    const {email, password} = req.body

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
        const token = jwt.sign({id: user.id}, config.secretKey, {
            expiresIn: 24*60*60 //сутки
        })

        const userinfo = user.get();
        res.status(200).send({
            ...userinfo,
            accessToken:token
        })

        //next(null, userinfo);

    } catch(err) {
        res.statusCode = 406;
        res.send(err.message)
    }
}

// const loadPassportStrategies = (passport) => {
//     //const User = user;
//     const LocalStrategy = require('passport-local').Strategy;
//
//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });
//
//     // для логаута (камингаута)
//     passport.deserializeUser((id, done) => {
//         //находим юзера
//         UserApi.getUserById(id).then(user => {
//             done(null, user.get()); //нашли
//         }).catch(err => {
//             done('not found', null); //не нашли
//         });
//     });
//
//     // passport.use(
//     //     'local-signup',
//     //     new LocalStrategy(
//     //         {
//     //             usernameField: 'email',
//     //             passwordField: 'password',
//     //             passReqToCallback: true
//     //         },
//     //         registrationUser
//     //     )
//     // );
//
//     //LOCAL SIGNIN
//     // passport.use(
//     //     'local-signin',
//     //     new LocalStrategy(
//     //         {
//     //             // by default, local strategy uses username and password, we will override with email
//     //             usernameField: 'email',
//     //             passwordField: 'password',
//     //             passReqToCallback: true //позволяет нам передать весь запрос на обратный вызов
//     //         },
//     //         signinUser
//     //     )
//     // );
//
// };

//export  {registrationUser, signinUser};
