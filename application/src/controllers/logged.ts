import jwt, {VerifyErrors} from "jsonwebtoken"
import config from "../config/index.js"
import {Request, Response, NextFunction} from "express";

//топовая проверка на допуск юзера до страницы(но другая)
export function verifyToken (req: Request, res: Response, next: NextFunction)  {
    let token = req.headers["x-access-token"];
    if (Array.isArray(token)) {
        token = token[0]
    }

    res.status(200)
    if (!token) {
        return res.send({
            error: "No token provided!"
        });
    }

    jwt.verify(token, config.secretKey, (err: VerifyErrors | null, decoded: any/* Приходит объект юзера */) => {
        if (err) {
            return res.send({
                error: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next()
    });
}

export function sendSuccess(req: Request, res: Response, next: NextFunction) {
    res.send({
        message: "Success"
    })
}