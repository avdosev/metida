const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const emailVaidator = body('email').isEmail().normalizeEmail();

const loginValidator = body('login').not().isEmpty().trim()
                            .not().isNumeric().withMessage('need char');

const passwordValidator = body('password').not().isEmpty().trim()
                            .isLength({min:5}).withMessage('so short').trim()
                            .isLength({max: 255}).withMessage('very big');

const validators = {  
    userCreateValidator: [
        emailVaidator,
        loginValidator,
        passwordValidator 
    ],
    userLoginValidator: [
        loginValidator,
        passwordValidator
    ]
}

module.exports = validators;