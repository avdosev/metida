const port = process.env.PORT || 7080;
const url = `localhost:${port}`;
const path = require('path');
const mainDir = path.join(__dirname, '..');
const imgDir = mainDir + '/public/img';
const secretKey = 'keyboard cat'
const production= ((process.env.NODE_ENV === "production") ? true : false)

const supportEmail = "kamille.larson66@ethereal.email"//для рассылки
const password = "j19hpbF6ae27GTNJWp" //в открытом доступе, ужасно

module.exports = {
    port,
    url,
    mainDir,
    imgDir,
    supportEmail,
    password,
    secretKey,
    production
};
