import jwt from "jsonwebtoken"
import config from "../config/index.js"

//топовая проверка на допуск юзера до страницы(но другая)
export function verifyToken (req, res, next)  {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next()
    });
}

export function sendSuccess(req, res, next) {
    res.status(200).send({
        message: "Success"
    })
}