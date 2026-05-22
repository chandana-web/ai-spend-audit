const Joi = require("joi");

const toolSchema = Joi.object({
  toolName: Joi.string().required(),

  currentPlan: Joi.string().required(),

  monthlySpend: Joi.number().min(0).required(),

  seats: Joi.number().min(1).required(),

  useCase: Joi.string()
    .valid(
      "coding",
      "writing",
      "research",
      "data",
      "mixed"
    )
    .required(),
});

const auditSchema = Joi.object({
  tools: Joi.array().items(toolSchema).min(1).required(),
});

module.exports = {
  auditSchema,
};