import Joi from 'joi';

const name = Joi.string().min(3).max(15);
const image = Joi.object();

const createCategorySchema = Joi.object({
    name: name.required(),
    image: image,
});

const upadateCategorySchema = Joi.object({
    name: name,
    image: image,
});

export {createCategorySchema, upadateCategorySchema};