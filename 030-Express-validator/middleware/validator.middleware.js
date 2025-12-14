// require express-validator functions
const {body,query,params ,validationResult} = require('express-validator');

//  Error handler middleware

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

//  Registration validation rules
const validateRegistration = [
    body('name')
    /* .optional() use this if the field is optional check name only when it is present
     */
        .notEmpty().withMessage('Name is required')
        .isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    validate

];
/* 
custom () validator used when built-in validators are not sufficient.
.custom() function can be used to create custom validation logic.
*/
module.exports = { validateRegistration };