function logRequest(req, res, next) {
    console.log('REQUEST:');
    console.log('body: ', req.body);
    console.log('url: ', req.url);
    console.log('method: ', req.method);
    console.log('END REQUEST\n');
    next();
}

module.exports = {
    logRequest
};
