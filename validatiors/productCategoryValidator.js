import Joi from 'joi';
// Joi schema for Category model
const categorySchema = Joi.object({
   category_name: Joi.string().required().trim(),
   category_description: Joi.string().trim(),
});
// Joi schema for Product model
const productSchema = Joi.object({
   product_name: Joi.string().required().trim(),
   product_description: Joi.string().required().trim(),
   price: Joi.number().required(),
   category: Joi.string().hex().length(24).required(),
   image: Joi.string(),
});
export  {categorySchema,productSchema};
