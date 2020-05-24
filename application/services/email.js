import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nodemail = require('nodemailer'); //только так, они не поддерживают модули
import config from "../config/index.js";

export default (email, subject, message) => {
    
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
        //console.log(`Message was sent on ${logs.accepted[0]}`)
        console.log(logs)
    }).catch(err => {
        console.error(err)
    });
}

