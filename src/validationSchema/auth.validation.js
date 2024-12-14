const { body } = require('express-validator');

const registerValidationSchema = [
  body('first_name')
      .isString().withMessage('Firstname must be a string')
      .isLength({ min: 5, max: 30 }).withMessage('Firstname must be between 5 and 30 characters')
      .notEmpty().withMessage('Firstname is required'),
  
    body('last_name')
        .isString().withMessage('Lastname must be a string')
        .isLength({ min: 5, max: 30 }).withMessage('Lastname must be between 5 and 30 characters')
        .notEmpty().withMessage('Lastname is required'),

    body('username')
        .isString().withMessage('Lastname must be a string')
        .isLength({ min: 5, max: 30 }).withMessage('Username must be between 5 and 30 characters')
        .notEmpty().withMessage('Lastname is required'),

    body('email')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email is required'),

    body('password')
        .isString().withMessage('Password must be a string')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])$/)
        .withMessage('Password must include at least a lowercase letter, an uppercase letter, a number, and special character')
        .isLength({ min: 8, max: 30 }).withMessage('Password must be at least 8 characters')
        .notEmpty().withMessage('Password is required'),
    
];


const loginValidationSchema = [
  body('email')
      .isEmail().withMessage('Invalid email format')
      .notEmpty().withMessage('Email is required'),

  body('password')
      .isString().withMessage('Password must be a string')
      .notEmpty().withMessage('Password is required'),
];

module.exports = { registerValidationSchema, loginValidationSchema };
