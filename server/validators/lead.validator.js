const Joi = require("joi");

const leadSchema = Joi.object({
  email: Joi.string().email().required(),

  companyName: Joi.string().allow("", null),

  role: Joi.string().allow("", null),

  teamSize: Joi.number().min(1),

  auditId: Joi.string().required(),
});

module.exports = {
  leadSchema,
};