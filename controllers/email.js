const nodemail = require('nodemailer');
const config = require("./../config/server")

module.exports = function(email, subject, message) {
    const mailTransport = nodemail.createTransport({
        service: 'gmail',
        secure: false,
        port: 25, //не ебу че за порт
        auth: {
            user: config.supportEmail,
            pass: config.password
        }
    });

    info = {
        from: '"Metida company 👻" <technakal@gmail.com>',
        to: email,
        subject: subject, //заголовок
        html: message
    };

    mailTransport.sendMail(info, (err, logs) => {
        if (err) {
            console.log(err);
        }
        //console.log(logs.messageId)
    });
}

