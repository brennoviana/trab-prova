import Joi from 'joi';

const roomCreateSchema = Joi.object({
  name: Joi.string()
  .min(6) 
  .max(100)
  .required(),

  description: Joi.string()
  .optional(),

  capacity: Joi.number()
  .min(1)
  .max(100)
  .required(),
});

export { roomCreateSchema };
