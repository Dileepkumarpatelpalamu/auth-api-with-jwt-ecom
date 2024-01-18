import Joi from 'joi';
const cartValidationSchema = Joi.object({
  user: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().integer().min(1).default(1),
      price: Joi.number().required(),
    })
  ).required().min(1).forbidden(),
});
export default cartValidationSchema;
