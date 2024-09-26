import Joi from "joi";

const userCreateSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(255).required(),
  password: Joi.string().min(8).max(100).required(),
});

export { userCreateSchema };
