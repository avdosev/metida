'use strict';
const nodemail = require('nodemailer');
const config = require("../config")

module.exports = (email, subject, message) => {
    
    let info = {
        from: '"Metida company 👻"',
        to: email,
        subject: subject, //заголовок
        html: message
    };
    
    nodemail.createTransport({ //посмотрим, сработает ли на проде
        service: 'Gmail',
        auth: {
            user: config.mail.support_email,
            pass: config.mail.password
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

