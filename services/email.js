'use strict';
const nodemail = require('nodemailer');
const config = require("../config/server")

module.exports = function(email, subject, message) {
    
    let info = {
        from: '"Metida company 👻" <technakal@gmail.com>',
        to: email,
        subject: subject, //заголовок
        html: message
    };
    nodemail.createTransport({
        service: 'gmail',
        secure: true,
        port: 135, //не ебу че за порт
        auth: {
            user: config.supportEmail,
            pass: config.password
        }
    }).sendMail(info).then((err, logs) => {
        if (err) {
            console.log(err);
        }
        console.log(logs)
    }).catch(err => {
        console.error(err)
    });
}

