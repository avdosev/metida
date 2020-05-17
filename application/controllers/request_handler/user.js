function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

import * as userApi from '../../services/user.js';


function getUserInfo(req, res, next) {
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
