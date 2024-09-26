import Joi from "joi";

const userUpdateSchema = Joi.object({
  name: Joi.string()
  .min(6)
  .max(100)
  .optional()
  .messages({
  'string.max': 'Name must not exceed 100 characters',
  }),

  email: Joi.string()
  .email()
  .max(255)
  .optional()
  .messages({
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string()
  .min(8)
  .max(100)
  .optional()
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must not exceed 100 characters',
  }),
});

export { userUpdateSchema };
