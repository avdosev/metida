import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const production= process.env.NODE_ENV === "production";
if (!production) {
    dotenv.load()
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const port = process.env.PORT;
export const url = `localhost:${port}`;
export const mainDir = path.join(__dirname, '..', '..');
export const imgDir = mainDir + '/public/img';
export const secretKey = process.env.SECRET_KEY

export const readJson = (filename: string) => JSON.parse(fs.readFileSync(`${__dirname}/${filename}`).toString());
export const mail = readJson('mail.json');
export const messages = readJson('messages.json');

export const sessionTime = 24*60*60 //сутки // через сколько пользователя выкинет // на норм сайтах, выдается на сутки, и продлевается


export default {
    port,
    url,
    mainDir,
    imgDir,
    secretKey,
    production,
    mail,
    messages,
    sessionTime
};
