const Joi = require("joi");

const rateValidate = (data) => {
  const rateSchema = Joi.object({
    msgId: Joi.required(),
    like: Joi.bool().required(),
    cohension: Joi.number().valid(1, 2, 3, 4, 5).required(),
    precise: Joi.number().valid(1, 2, 3, 4, 5).required(),
    nonRedundancy: Joi.number().valid(1, 2, 3, 4, 5).required(),
    comment: Joi.string().optional(),
  });

  return rateSchema.validate(data);
};

module.exports = rateValidate;
