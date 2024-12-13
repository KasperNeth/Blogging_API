const { body } = require('express-validator');

const registerValidationRules = [
  body('first_name')
      .isString().withMessage('Firstname must be a string')
      .isLength({ min: 2, max: 30 }).withMessage('Firstname must be between 6 and 30 characters')
      .notEmpty().withMessage('Firstname is required'),
  
    body('last_name')
        .isString().withMessage('Lastname must be a string')
        .isLength({ min: 2, max: 30 }).withMessage('Lastname must be between 6 and 30 characters')
        .notEmpty().withMessage('Lastname is required'),

    body('username')
        .isString().withMessage('Lastname must be a string')
        .isLength({ min: 2, max: 30 }).withMessage('Lastname must be between 6 and 30 characters')
        .notEmpty().withMessage('Lastname is required'),

    body('email')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email is required'),

    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 7 }).withMessage('Password must be at least 6 characters')
        .notEmpty().withMessage('Password is required'),
    
];


const loginValidationRules = [
  body('email')
      .isEmail().withMessage('Invalid email format')
      .notEmpty().withMessage('Email is required'),

  body('password')
      .isString().withMessage('Password must be a string')
      .notEmpty().withMessage('Password is required'),
];

module.exports = { registerValidationRules, loginValidationRules };
