import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const production= process.env.NODE_ENV === "production";
if (!production) {
    dotenv.load()
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.SERVER_PORT;
const url = `localhost:${port}`;
const mainDir = path.join(__dirname, '..', '..');
const imgDir = mainDir + '/public/img';
const secretKey = process.env.SECRET_KEY

const readJson = (filename) => JSON.parse(fs.readFileSync(`${__dirname}/${filename}`).toString());
const mail = readJson('mail.json');
const messages = readJson('messages.json');

const sessionTime = 24*60*60 //сутки // через сколько пользователя выкинет // на норм сайтах, выдается на сутки, и продлевается


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
