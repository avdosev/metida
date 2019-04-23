const fs = require('fs');
const path = require('path');
const { mainDir } = require('../config/server');

function getFile(req, res, next) {
    var filename = req.url.match('\\w+/\\w+\\.\\w*$')[0]; // нужно правильно парсить
    var filePath = path.join(mainDir, 'public', filename); //ыыы готово
    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.log(
                'fail get file with dir:',
                error.path,
                '\n',
                'with error: ',
                error
            );
            res.statusCode = 404;
            res.end('Resourse not found!');
        } else {
            res.setHeader('Content-Type', 'img'); // это не нужно
            res.end(data);
        }
    });
}

module.exports = {
    getFile
};
