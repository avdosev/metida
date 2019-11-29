function initValues(req) {
    if (!req.values) {
        req.values = new Object;
    }
}

const userApi = require('../../services/user')


function getUserInfo(req, res, next) {
    const login = req.params.login;

    userApi.getAllPublicInfo({username: login})
        .then((value) => {
            initValues(res);
            res.values.userInfo = value.dataValues;
            next()
        })
}

module.exports = {
    getUserInfo
};
