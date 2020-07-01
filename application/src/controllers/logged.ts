import jwt, { VerifyErrors } from 'jsonwebtoken';
import config, { secretKey } from '../config/index.js';
import { Request, Response, NextFunction } from 'express';

export function getJwtTokenFromHeaderParams(req: Request): string {
    let token = req.headers['x-access-token'];
    if (Array.isArray(token)) {
        token = token[0];
    }
    return token;
}

export interface DecodedObject {
    id: number;
    iat: number;
    exp: number;
}

export function verify(token): DecodedObject | string {
    // ля да почему
    // @ts-ignore
    return jwt.verify(token, secretKey, (err: VerifyErrors | null, decoded: DecodedObject | null) => {
        if (err) {
            return err.message;
        } else {
            return decoded;
        }
    });
}

//топовая проверка на допуск юзера до страницы(но другая)
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = getJwtTokenFromHeaderParams(req);

    if (!token) {
        return res.status(403).send({
            error: 'No token provided! Please set your auth token in header parameter "x-access-token". ',
        });
    }

    const user = verify(token);

    if (typeof user === 'string') {
        // это ошибка, значится
        return res.status(403).send({
            error: user,
        });
    } else {
        req.userId = user.id;
        req.status = user;
        next();
    }
}

export function sendSuccess(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
        message: 'Success',
        status: req.status,
    });
}
