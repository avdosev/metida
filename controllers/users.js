const bCrypt = require('bcrypt-nodejs');
const { validationResult } = require('express-validator/check');
const mailer = require("../services/email")
const UserApi = require("../services/user")

function generateHash (password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    );
};

const loadPasportStrategies = (passport, user) => {
    const User = user;
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
            (req, email, password, done) => {
                const res = req.res;
                const errors = validationResult(req); //вроде это никогда не сработает
                if (!errors.isEmpty()) {
                    res.statusCode = 406;
                    res.send('Валидация не пройдена')
                }

                UserApi.getUserByEmail(email).then(user => {
                    if (user) {
                        throw new Error('Емейл уже занят');
                    } else {
                        const userPassword = generateHash(password); // зашифрованный
                        const username = req.body.login

                        UserApi.createUser(email, username, userPassword).then((newUser) => {
                            if (!newUser) {
                                throw new Error('Юзер не создан');
                            }
                            // MAILER //я оформил это отдельной страницей
                            const text = "<p> Поздравляем с регистрацие на Метида, для окончания регистрации подтвердите </p> <a href=\"metida.tech\"> Согласен </a>, если это были не вы игнорируете сообщение"
                            mailer(email, "Confirm this email", text)

                            done(null, newUser); //все ок
                        }).catch(err => {
                            // не все ок
                            res.statusCode = 406;
                            res.send(err.message)
                        });
                    }
                }).catch((err) => {
                    res.statusCode = 406;
                    res.send(err.message)
                })
            }
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

            (req, email, password, next) => { //некст нас не кинет на следующий обработчик
                //const User = user;
                console.log(req.body)
                const isValidPassword = (userpass, password) => {
                    return bCrypt.compareSync(password, userpass);
                };


                UserApi.getUserByEmail(email)
                    .then( (user) => {
                        if (!user) {
                            throw new Error('Email does not exist');  
                        }

                        if (!isValidPassword(user.password, password)) {
                            throw new Error('Incorrect password.');
                        }

                        const userinfo = user.get();
                        return next(null, userinfo);
                    })
                    .catch(err => {
                        console.log('Ошибка :', err); //у нас произошла ошибка выше по коду и мы начали
                    });
            }
        )
    );

};

module.exports = {
    loadPasportStrategies
};
