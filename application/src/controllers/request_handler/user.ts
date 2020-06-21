import {NextFunction, Request, Response} from "express";
import * as userApi from '../../services/user.js';
import {initValues} from "../../services/initValues";


async function getUserInfo(req: Request, res: Response, next: NextFunction) {
    const login = req.params.login;

    const publicinfo = await userApi.getAllPublicInfo({username: login})
    initValues(res);
    res.values.userInfo = publicinfo.dataValues;
    next()
}

export {
    getUserInfo
};
