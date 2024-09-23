const Joi = require('joi');


const userRegistrationSchema = Joi.object({
    userName: Joi.string().required().messages({
        'any.required': 'User name is required'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password should be at least 6 characters'
    }),
    birthDate: Joi.string().optional(),
    address: Joi.array().items(Joi.string()).optional(),
    phone: Joi.string().required().messages({
        'any.required': 'Phone number is required'
    }),
    profileImage: Joi.string().optional(),
    location: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().items(Joi.number()).length(2).required() 
      }).required()
});




const userloginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password should be at least 6 characters'
    })
});


const adminRegisterSchema = Joi.object({
    userName: Joi.string().min(3).required().messages({
        'any.required': 'User name is required',
        'string.min': 'User name should be at least 3 characters long'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password should be at least 6 characters long'
    }),
    role: Joi.string().valid('admin', 'subAdmin').required().messages({
        'any.required': 'Role is required',
        'string.valid': 'Role must be one of the following: admin, subAdmin'
    })
});

const adminloginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address'
        }),
        password: Joi.string().min(6).required().messages({
            'any.required': 'Password is required',
            'string.min': 'Password should be at least 6 characters long'
            })
});


const vendorRegistrationSchema = Joi.object({
    vendorName: Joi.string().required().messages({
        'any.required': 'Vendor name is required'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    // password: Joi.string().min(6).required().messages({
    //     'any.required': 'Password is required',
    //     'string.min': 'Password should be at least 6 characters'
    // }),

    password: Joi.string()
            .min(6)
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one letter, one number, and one special character (!@#$%^&*).'
            }),
  
});

const deliveryManRegistrationSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Vendor name is required'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    phone: Joi.string().required().messages({
        'any.required': 'Phone number is required'
    }),

    password: Joi.string()
            .min(6)
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one letter, one number, and one special character (!@#$%^&*).'
            }),
  
});
module.exports = { userRegistrationSchema, userloginSchema, adminRegisterSchema, adminloginSchema, vendorRegistrationSchema, deliveryManRegistrationSchema };

































// const loginSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string()
//         .min(6)
//         .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
//         .required()
//         .messages({
//             'string.pattern.base': 'Password must contain at least one letter, one number, and one special character (!@#$%^&*).'
//         }),
// });