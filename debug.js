function logRequest(req, res, next) {
    console.log(req.body);
    console.log(req.url);
    console.log(req.method)
    next();
}

module.exports = {
    logRequest
}