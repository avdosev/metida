const path = require('path');
const dotenv = require("dotenv")

const production= ((process.env.NODE_ENV === "production") ? true : false)
if (!production) {
    dotenv.load()
}

const port = process.env.PORT;
const url = `localhost:${port}`;
const mainDir = path.join(__dirname, '..');
const imgDir = mainDir + '/public/img';
const secretKey = process.env.SECRET_KEY

const mail = require('./mail')
const messages = require('./messages')

console.log(mail, messages)

module.exports = {
    port,
    url,
    mainDir,
    imgDir,
    secretKey,
    production,
    mail,
    messages
};
