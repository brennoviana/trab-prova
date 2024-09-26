import Joi from 'joi';

const userCreateSchema = Joi.object({
  name: Joi.string()
    .min(6) 
    .max(100)
    .required(),
  
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .required(),
  
  password: Joi.string()
    .min(6)
    .required(),
});

export { userCreateSchema };
