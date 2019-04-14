const fs = require("fs");
const path = require("path");

function getFile(req, res, next) {
    var filename = req.url.match("\\w+\/\\w+\\.\\w*$")[0]; // нужно правильно парсить
    var filePath = path.join(__dirname,'../public',filename); //ыыы готово
    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.log("fail get file with dir:", error.path, "\n", "with error: ", error);
            res.statusCode = 404;
            res.end("Resourse not found!");
        } else {
            res.setHeader("Content-Type", "img");
            res.end(data);
        }
    })
}

module.exports = {
    getFile
}