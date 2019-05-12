const nodemail = require('nodemailer');

module.exports = function(email, subject, message) {
    const mailTransport = nodemail.createTransport({
        service: 'gmail',
        secure: false,
        port: 25, //не ебу че за порт
        auth: {
            user: "technakal@gmail.com",
            pass: "nakaltech2019"
        }
    });

    info = {
        from: 'Metida',
        to: email,
        subject: subject,
        text: message
    };

    mailTransport.sendMail(info, (err, logs) => {
        if (err) {
            console.log(err);
        }
        console.log(logs)
    });
}

