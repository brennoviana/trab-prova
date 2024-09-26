import Joi from 'joi';

const userCreateSchema = Joi.object({
  name: Joi.string()
    .min(6) 
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.max': 'Name must not exceed 100 characters',
      'any.required': 'Name is required',
    }),
  
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email is required',
      'string.max': 'Email must not exceed 100 characters',
      'any.required': 'Email is required',
    }),
  
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
    }),
});

export { userCreateSchema };
