const port = process.env.PORT || 7080;
const url = `localhost:${port}`;
const path = require('path');
const mainDir = path.join(__dirname, '..');
const imgDir = mainDir + '/public/img';

const supportEmail = "technakal@gmail.com"//для рассылки
const password = "nakaltech2019" //в открытом доступе, но пох

module.exports = {
    port,
    url,
    mainDir,
    imgDir,
    supportEmail,
    password
};
