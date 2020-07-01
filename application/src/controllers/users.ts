import bCrypt from 'bcrypt';
import { validationResult } from 'express-validator/check';
import mailer from '../services/email.js';
import * as UserApi from '../services/user.js';
import config, { secretKey, sessionTime } from '../config/index.js';
import jwt from 'jsonwebtoken';
import { generateHash } from '../services/hasher';
import { NextFunction, Request, Response } from 'express';

const validators = {
    register: {
        validationFailed: 'Валидация не пройдена',
        existedEmail: 'Емейл уже занят',
        userNotCreated: 'Юзер не создан',
    },
    signIn: {
        emailNotExisted: 'Такого емейла не существует',
        incorrectPassword: 'Неправильный пароль.',
    },
};

export async function registrationUser(req: Request, res: Response, next: NextFunction) {
    let { email, password, login } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.statusCode = 406;
        res.send(validators.register.validationFailed);
    }
    try {
        const user = await UserApi.getUserByEmail(email);

        if (user) throw new Error(validators.register.existedEmail);

        const hashPassword = generateHash(password); // зашифрованный

        const newUser = await UserApi.createUser(email, login, hashPassword);

        if (!newUser) {
            throw new Error(validators.register.userNotCreated);
        }

        const text = config.messages.activation;
        // try {
        //     mailer(email, "Confirm this email", text);
        // } catch(err) {
        //     console.log(err);
        // }
        const existedUser = await UserApi.getUserByEmail(email); //круто, да, что вызов дважды за функцию?
        await loginUser(existedUser, res);
    } catch (err) {
        res.status(406).send({
            ...err.message,
        });
    }
}

async function loginUser(user, res) {
    const token = jwt.sign({ id: user.id, data: user }, secretKey, {
        expiresIn: sessionTime,
    });

    const userinfo = user.get(); //ради единого интерфейса, чтобы были одни и те же данные, как и после регистрации, так и после сигн ина, сойдемся на том, что юзеры регистрируются 1 раз, а входят много, поэтому лучше сделать регистрацию немного дольше
    const { password, ...publicUser } = userinfo;
    res.status(200).send({
        ...publicUser,
        accessToken: token,
    });
}

export async function signinUser(req, res, next) {
    let { email, password } = req.body;
    const isValidPassword = (userpass, password) => {
        return bCrypt.compareSync(password, userpass);
    };

    try {
        const user = await UserApi.getUserByEmail(email);

        if (!user) {
            throw new Error(validators.signIn.emailNotExisted);
        }

        if (!isValidPassword(user.password, password)) {
            throw new Error(validators.signIn.incorrectPassword);
        }

        await loginUser(user, res);
    } catch (err) {
        res.statusCode = 406;
        res.send(err.message);
    }
}
