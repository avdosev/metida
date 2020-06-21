import db from '../database/models';
const { user: User, article: Article, comments: Comment } = db;

function getUserById(userId: number) {
    return User.findOne({
        where: {
           id: userId
        }
    })
}

function getUserByEmail(email: string) {
    return User.findOne({
        where: {
           email
        }
    })
}

function createUser(email: string, username: string, password: string) {
    return User.create({
        email,
        username,
        password
    })
}

function getAllPublicInfo(whereUser: {[name: string]: any}) {
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
    createUser,
    getUserById,
    getUserByEmail,
    getAllPublicInfo
}

