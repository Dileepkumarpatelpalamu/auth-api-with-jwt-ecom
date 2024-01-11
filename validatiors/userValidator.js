import Joi from 'joi';
const registerUserValidator = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  mobile_no: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().default('agent'),
  status: Joi.string().default('ACTIVE'),
  createdAt: Joi.date().default(() => new Date()),
});
const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),

})

export {registerUserValidator,loginUserValidator};
