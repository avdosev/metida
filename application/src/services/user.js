import db from '../database/models';
const { user: User, article: Article, comments: Comment } = db;

function isConfirmedEmail(userId) {
    return new Promise((resolve, reject) => {
        User.findOne({
            attributes: [
                'activatedEmail'
            ],
            where: {
                id: userId
            }
        }).then((value) =>{
            console.log(value)
            resolve(value)
        }).catch(err => {
            reject(err)
        })
    })
}


function confirmEmailById(userId) {
    return User.update({
        activatedEmail: true
    }, {
        where:{
            id: userId
        }
    })
}

function confirmEmailByEmail(email) {
    return User.update({
        activatedEmail: true
    }, {
        where:{
            email: email
        }
    })
}

function getUserById(userId) {
    return User.findOne({
        where: {
           id: userId
        }
    })
}

function getUserByEmail(email) {
    return User.findOne({
        where: {
           email
        }
    })
}

function createUser(email, username, password) {
    return User.create({
        email,
        username,
        password
    })
}

function getAllPublicInfo(whereUser) {
    return User.findOne({
        where: whereUser,
        include: [{
            // inner join
            model: Article,
            as: 'articles',
            attributes: [
                'id', 'header', 'disclaimer'
            ]
        }],
        attributes: [
            'id', 'avatar', 'about', 'username', 'firstname', 'lastname'
        ]
    })
}

export {
    isConfirmedEmail,
    confirmEmailByEmail,
    confirmEmailById,
    createUser,
    getUserById,
    getUserByEmail,
    getAllPublicInfo
}
