import Joi from "joi";

const userUpdateSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  email: Joi.string().max(255).optional(),
  password: Joi.string().min(8).max(100).optional(),
});

export { userUpdateSchema };
