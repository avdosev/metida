import bCrypt from 'bcrypt';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { validationResult } = require('express-validator');
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

export async function registrationUser(req, res, next) {
    let {email, password, login} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.statusCode = 406;
        res.send(validators.register.validationFailed)
    }
    try {
        const user = await UserApi.getUserByEmail(email)

        if (user) 
            throw new Error(validators.register.existedEmail);
        
        const hashPassword = generateHash(password); // зашифрованный

        const newUser = await UserApi.createUser(email, login, hashPassword)
        
        if (!newUser) {
            throw new Error(validators.register.userNotCreated);
        }

        const text = config.messages.activation;
        try {
            mailer(email, "Confirm this email", text);
        } catch(err) {
            console.log(err);
        }


    } catch (err) {
        res.statusCode = 406;
        res.send(err.message)
    }
}

function loginUser() {

}

export async function signinUser(req, res, next) {
    let {email, password} = req.body
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

    } catch(err) {
        res.statusCode = 406;
        res.send(err.message)
    }
}