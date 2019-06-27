const { user: User } = require('../database/models')


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

module.exports = {
    isConfirmedEmail,
    confirmEmailByEmail,
    confirmEmailById,
    createUser,
    getUserById,
    getUserByEmail
}


