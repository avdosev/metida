import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const dotenv = require('dotenv');

const production= process.env.NODE_ENV === "production";
if (!production) {
    dotenv.load()
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;
const url = `localhost:${port}`;
const mainDir = path.join(__dirname, '..');
const imgDir = mainDir + '/public/img';
const secretKey = process.env.SECRET_KEY

const mail = require('./mail');
const messages = require('./messages');

export default {
    port,
    url,
    mainDir,
    imgDir,
    secretKey,
    production,
    mail,
    messages
};
