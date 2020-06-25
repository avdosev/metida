import {NextFunction, Request, Response} from "express";

function logRequest(req: Request, res: Response, next: NextFunction) {
    console.log('REQUEST:');
    console.log('body: ', req.body);
    console.log('url: ', req.url);
    console.log('method: ', req.method);
    console.log('END REQUEST\n');
    next();
}

function logRequestValues(req: Request, res: Response, next: NextFunction) {
    console.log('Request values: ', req.values);
    next()
}

function logResponseValues(req: Request, res: Response, next: NextFunction) {
    console.log('Response values: ', res.values);
    next()
}

export {
    logRequest,
    logRequestValues,
    logResponseValues
};
