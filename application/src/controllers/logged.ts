import jwt, { VerifyErrors } from 'jsonwebtoken';
import config, { secretKey } from '../config/index.js';
import { Request, Response, NextFunction } from 'express';
import { IPublicUser } from '../../../client/src/components/Organisms/IPrivateUser';

export function getJwtTokenFromHeaderParams(req: Request): string {
    let token = req.headers['x-access-token'];
    if (Array.isArray(token)) {
        token = token[0];
    }
    return token;
}

export function verify(token): IPublicUser | null {
    jwt.verify(token, secretKey, (err: VerifyErrors | null, decoded: IPublicUser) => {
        if (err) {
            return null;
        } else {
            return decoded;
        }
    });
    return null;
}

//топовая проверка на допуск юзера до страницы(но другая)
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = getJwtTokenFromHeaderParams(req);

    res.status(200);
    if (!token) {
        return res.send({
            error: 'No token provided! Please set your auth token in header parameter "x-access-token". ',
        });
    }

    const user = verify(token);
    if (user) {
        req.userId = user.id;
        next();
    } else {
        return res.send({
            error: 'Unauthorized!',
        });
    }
}

export function sendSuccess(req: Request, res: Response, next: NextFunction) {
    res.send({
        message: 'Success',
    });
}
