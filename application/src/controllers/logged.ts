import jwt from "jsonwebtoken"
import config from "../config/index.js"

//топовая проверка на допуск юзера до страницы(но другая)
export function verifyToken (req, res, next)  {
    let token = req.headers["x-access-token"];

    res.status(200)
    if (!token) {
        return res.send({
            error: "No token provided!"
        });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            return res.send({
                error: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next()
    });
}

export function sendSuccess(req, res, next) {
    res.send({
        message: "Success"
    })
}