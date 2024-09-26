import Joi from 'joi';

const roomCreateSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  capacity: Joi.number().required(),
});

export { roomCreateSchema };
