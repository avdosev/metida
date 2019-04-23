const { body } = require('express-validator/check');

const emailVaidator = body('email')
    .isEmail()
    .normalizeEmail();

const loginValidator = body('login')
    .not()
    .isEmpty()
    .trim()
    .not()
    .isNumeric()
    .withMessage('need char')
    .isLength({ max: 20 });

const passwordValidator = body('password')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 5 })
    .withMessage('so short')
    .trim()
    .isLength({ max: 50 })
    .withMessage('very big');

const validators = {
    userCreateValidator: [emailVaidator, loginValidator, passwordValidator],
    userLoginValidator: [emailVaidator, passwordValidator]
};

module.exports = validators;
