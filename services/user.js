const usersInit = require('../database/models/user');
const models = require('../database/models');
const User = usersInit(models.sequelize, models.Sequelize); 


function isConfirmedEmail(userId) {
    User.findOne({
        where: {
            id: userId
        }
    })
    console.log(User.activatedEmail)
    if (User.activatedEmail)
        return true
    else 
        return false
}


function confirmEmailById(userId) {
    return User.update({
        activatedEmail: true
    }), {
        where:{
            id: userId
        }
    }
}

function confirmEmailByEmail(email) {
    return User.update({
        activatedEmail: true
    }), {
        where:{
            email: email
        }
    }
}



module.exports = {
    confirmEmailByEmail,
    confirmEmailById,
    isConfirmedEmail
}


