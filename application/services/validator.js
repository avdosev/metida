import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body } = require('express-validator/check');

const emailValidator = body('email')
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

const titleValidator = body('header')
    .not()
    .isEmpty()
    .isLength({min: 5, max: 255});

const articleTextValidator = body('art')
    .not()
    .isEmpty();

export const
    userCreateValidator = [emailValidator, loginValidator, passwordValidator],
    userLoginValidator = [emailValidator, passwordValidator],
    articleValidator = [titleValidator, articleTextValidator];

