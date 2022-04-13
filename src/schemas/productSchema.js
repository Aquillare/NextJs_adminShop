import Joi from 'joi';

const name = Joi.string().min(3).max(20);
const price = Joi.number().min(10);
const categoryId = Joi.number().valid(1, 2, 3, 4, 5);
const description = Joi.string().min(10);
const image = Joi.object();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  categoryId: categoryId.required(),
  description: description.required(),
  image: image,
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  categoryId: categoryId,
  description: description,
  image: image,
})

export {createProductSchema, updateProductSchema};
