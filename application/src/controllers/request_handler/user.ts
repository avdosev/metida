import {NextFunction, Request, Response} from "express";
import * as userApi from '../../services/user.js';
import {initValues} from "../../services/initValues";


function getUserInfo(req: Request, res: Response, next: NextFunction) {
    const login = req.params.login;

    userApi.getAllPublicInfo({username: login})
        .then((value) => {
            initValues(res);
            res.values.userInfo = value.dataValues;
            next()
        })
}

export {
    getUserInfo
};
