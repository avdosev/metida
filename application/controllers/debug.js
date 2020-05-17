function logRequest(req, res, next) {
    console.log('REQUEST:');
    console.log('body: ', req.body);
    console.log('url: ', req.url);
    console.log('method: ', req.method);
    console.log('END REQUEST\n');
    next();
}

function logRequestValues(req, res, next) {
    console.log('Request values: ', req.values);
    next()
}

function logResponseValues(req, res, next) {
    console.log('Response values: ', res.values);
    next()
}

module.exports = {
    logRequest,
    logRequestValues,
    logResponseValues
};
