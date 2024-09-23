// middlewares/validateMiddleware.js
const Joi = require('joi');
const { createError } = require('../utils/errorUtil');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false }); 
        if (error) {
            const errorDetails = error.details.map(err => ({
                message: err.message,
                path: err.path
            }));
            console.error('Validation Error Details:', errorDetails); 
            return next(createError('Validation error', 400, { details: errorDetails }));
        }
        next();
    };
};

module.exports = validate;
