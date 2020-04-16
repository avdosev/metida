import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

if (!process.env.NODE_ENV) {
    dotenv.load();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;
const url = `localhost:${port}`;
const mainDir = path.join(__dirname, '..');
const imgDir = mainDir + '/public/img';
const secretKey = process.env.SECRET_KEY;
const serverType = process.env.NODE_ENV || process.env.SERVER_TYPE || 'production';
const production = serverType === "production";

const readJson = (filename) => JSON.parse(fs.readFileSync(`${__dirname}/${filename}`).toString());
const mail = readJson('mail.json');
const messages = readJson('messages.json');

export default {
    port,
    url,
    mainDir,
    imgDir,
    secretKey,
    production,
    mail,
    messages,
    serverType
};
