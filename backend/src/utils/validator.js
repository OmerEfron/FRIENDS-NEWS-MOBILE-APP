const Joi = require('joi');
const { ApiError } = require('../middleware/error');

const schemas = {
  group: Joi.object({
    name: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(10).max(500),
    avatar: Joi.string().uri().optional(),
    memberCount: Joi.number().integer().min(0).optional()
  }).unknown(false),

  post: Joi.object({
    headline: Joi.string().required().min(5).max(100),
    subheadline: Joi.string().required().min(5).max(200),
    content: Joi.string().required().min(10).max(5000),
    media: Joi.object({
      url: Joi.string().uri().required(),
      thumbnail: Joi.string().uri(),
      type: Joi.string().valid('image', 'video').required(),
      size: Joi.number().required()
    }).optional(),
    groupId: Joi.string().required(),
    isBreakingNews: Joi.boolean().default(false)
  }),

  user: Joi.object({
    username: Joi.string().required().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(100),
    avatar: Joi.string().uri().optional(),
    groups: Joi.array().items(Joi.string()).default([])
  }).unknown(false),

  userUpdate: Joi.object({
    username: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/),
    avatar: Joi.string().uri()
  }).unknown(false)
};

const validate = (schema, data) => {
  const validationSchema = schemas[schema];
  if (!validationSchema) {
    throw new ApiError(500, `Validation schema ${schema} not found`);
  }

  const { error } = validationSchema.validate(data);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }
};

module.exports = {
  validate
}; 