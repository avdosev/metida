const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const validators = {  
    userValidator: [
        body('email').isEmail().normalizeEmail(),
        body('password').not().isEmpty().trim()
            .isLength({min:5}).withMessage('So short')
            .not().matches(/\d/).withMessage('need number')
            .matches(/^\d+$/).withMessage("need char"),
        body('login').not().isNumeric().withMessage('need char! ') 
    ]

}

module.exports = validators;