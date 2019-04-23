const port = 7080;
const url = `localhost:${port}`;
const path = require('path');
const mainDir = path.join(__dirname, '..');
const imgDir = mainDir + '/public/img';

module.exports = {
    port,
    url,
    mainDir,
    imgDir
};
