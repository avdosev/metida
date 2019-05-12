const nodemail = require('nodemailer');

let testAccount = nodemail.createTestAccount(); //хм

module.exports = function(email, subject, message) {
    const mailTransport = nodemail.createTransport({
        service: 'gmail',
        secure: false,
        port: 25, //не ебу че за порт
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    info = {
        from: 'Metida',
        to: email,
        subject: subject,
        text: message
    };

    mailTransport.sendMail(info, (err, info) => {
        if (error) {
            console.log(error);
        }
        console.log(logs.messageId);
    });
}

