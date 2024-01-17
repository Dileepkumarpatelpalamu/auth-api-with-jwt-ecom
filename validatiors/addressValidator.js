import Joi from 'joi';
const addressValidation = Joi.object({
  user: Joi.string().required().min(5),
  address: Joi.string().required(),
});
export default addressValidation;