import { check } from 'express-validator/check';

const validators = {};

validators.register = [
    check('fname').isLength({ min: 1 }),
    check('lname').isLength({ min: 1 }),
    check('username').isLength({ min: 3 }),
    check('email').isEmail(),
    check('password').isLength({ min: 1 })
];

export default validators;