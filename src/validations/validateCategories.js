const Joi = require('joi');

const validateCategories = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'string.required': '"name" is required' }),
});

module.exports = validateCategories;