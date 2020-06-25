import * as path from 'path';
import dotenv from 'dotenv';
import mail from './mail.json'
import messages from './messages.json'


const production= process.env.NODE_ENV === "production";
if (!production) {
    dotenv.load()
}

export const port = process.env.PORT;
export const url = `localhost:${port}`;
export const mainDir = path.join(__dirname, '..', '..', '..');
export const imgDir = mainDir + '/public/img';
export const secretKey = process.env.SECRET_KEY
export const sessionTime = 24*60*60 //сутки // через сколько пользователя выкинет // на норм сайтах, выдается на сутки, и продлевается
export const clientDir = path.join(mainDir, 'client', 'dist')


export default {
    production,
    mail,
    messages,
};
