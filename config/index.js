const path = require('path');

const port = process.env.PORT || 7080;
const url = `localhost:${port}`;
const mainDir = path.join(__dirname, '..');
const imgDir = mainDir + '/public/img';
const secretKey = 'keyboard cat'
const production= ((process.env.NODE_ENV === "production") ? true : false)

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
