const Joi = require('joi')

export const apiUrlSchema = Joi.object().keys({
  originalUrl: Joi.string().required(),
})
